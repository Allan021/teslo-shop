import bycript from "bcrypt";
import jwt from "jsonwebtoken";

export const validatePassword = ({
  password,
  passwordOfUser,
}: {
  password: string;
  passwordOfUser: string;
}): boolean => bycript.compareSync(password, passwordOfUser);

export const createJWT = (_id: string, email: string) => {
  return jwt.sign({ _id, email }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
};

export const hashPassword = (password: string) => {
  return bycript.hashSync(password, bycript.genSaltSync(10));
};

const auth = {
  validatePassword,
  createJWT,
  hashPassword,
};

export default auth;
