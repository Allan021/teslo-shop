import { NextApiRequest, NextApiResponse } from "next";

import { Role } from "../../../interfaces/user";
import { User } from "../../../models";
import { jwt } from "../../../utils";

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
      return validateToken(req, res);

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method method Not Allowed`);
  }
}
export const validateToken = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { token = "" } = req.cookies;

  let userId = "";

  try {
    userId = await jwt.validateJWT(token);
  } catch (error) {
    return res.status(401).json({
      message: "Token invalido",
    });
  }

  if (!userId) {
    return res.status(401).json({
      message: "Token invalido",
    });
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.status(401).json({
      message: "No existe usuario",
    });
  }

  const { name, email, role } = user;

  return res.status(200).json({
    token: jwt.signToken(userId, email),
    user: {
      name,
      email,
      role,
    },
  });
};
