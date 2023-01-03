import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Role } from "../../../interfaces/user";
import { User } from "../../../models";
import auth from "../../../utils/auth.util";

type Data =
  | {
      message: string;
    }
  | {
      token: string;
      user: {
        name: string;
        email: string;
        role: Role;
      };
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;
  switch (method) {
    case "POST":
      return login(req, res);

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method method Not Allowed`);
  }
}
export const login = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide email and password",
    });
  }

  await db.connect();
  const user = await User.findOne({ email });

  await db.disconnect();

  if (!user) {
    return res.status(400).json({
      message: "Email or password son incorrectas",
    });
  }

  const isMatch = auth.validatePassword({
    password,
    passwordOfUser: user.password!,
  });

  if (!isMatch) {
    return res.status(400).json({
      message: "Email or password son incorrectas",
    });
  }

  const { role, name, _id } = user;
  const token = auth.createJWT(`${_id}`, user.email);

  return res.status(200).json({
    token,
    user: {
      name,
      email,
      role,
    },
  });
};
