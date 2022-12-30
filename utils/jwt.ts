import jwt from "jsonwebtoken";
export const validateJWT = (token: string): Promise<string> => {
  if (!process.env.JWT_SECRET) {
    throw new Error("No JWT_SECRET found in .env file");
  }

  return new Promise((resolve, reject) => {
    if (!token) {
      return reject("No token found");
    }

    if (token.length < 10) {
      return reject("Invalid token");
    }

    jwt.verify(token, process.env.JWT_SECRET || "", (err, payload) => {
      if (err) {
        return reject(err);
      }
      const { _id } = payload as { _id: string };
      resolve(_id);
    });
  });
};
export const signToken = (_id: string, email: string) => {
  return jwt.sign({ _id, email }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
};
