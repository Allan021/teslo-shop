import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { dbUsers } from "../../../database";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: "Credentials Login",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email || "";
        const password = credentials?.password || "";

        const user = await dbUsers.checkUserWithCredentials(email, password);
        return user;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "GITHUB_ID",
      clientSecret: process.env.GITHUB_SECRET || "GITHUB",
    }),
    // ...add more providers here
  ],

  //custom pages
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },

  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  callbacks: {
    async jwt({ token, user, account, isNewUser }: any) {
      if (account) {
        token.accessToken = account.accessToken;

        switch (account.type) {
          case "oauth":
            const email = user?.email || "";
            const name = user?.name || "";

            const usuario = await dbUsers.oAuthUser(email, name);

            token.user = usuario;
            break;

          case "credentials":
            token.user = user;
            break;

          default:
            break;
        }
      }

      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      session.user = token.user as any;
      return session;
    },
  },
};
export default NextAuth(authOptions);
