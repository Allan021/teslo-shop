import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Role } from "../../../interfaces/user";
import { User } from "../../../models";
import { validations } from "../../../utils";
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
      return register(req, res);

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method method Not Allowed`);
  }
}
export const register = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { email = "", password = "", name = "" } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({
      message: "Please provide email and password",
    });
  }

  if (name.length < 2) {
    return res.status(400).json({
      message: "El nombre debe tener al menos 2 caracteres",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "La contraseña debe tener al menos 6 caracteres",
    });
  }

  if (!validations.isValidEmail(email)) {
    return res.status(400).json({
      message: "El correo no parece ser válido",
    });
  }

  await db.connect();
  const user = await User.findOne({ email });

  if (user) {
    await db.disconnect();
    return res.status(400).json({
      message: "El email ya está registrado",
    });
  }

  const newUser = new User({
    name,
    email,
    role: "client",
    password: auth.hashPassword(password),
  });

  try {
    await newUser.save({ validateBeforeSave: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error al crear el usuario",
    });
  }

  await db.disconnect();
  const { role, _id } = newUser;
  const token = auth.createJWT(`${_id}`, email);

  return res.status(200).json({
    token,
    user: {
      name,
      email,
      role,
    },
  });
};
