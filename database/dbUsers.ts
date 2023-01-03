import { db } from ".";
import { User } from "../models";
import auth from "../utils/auth.util";

export const checkUserWithCredentials = async (
  email: string,
  password: string
) => {
  await db.connect();
  const user = await User.findOne({ email });

  await db.disconnect();
  if (!user) {
    return null;
  }

  const isValid = await auth.validatePassword({
    password,
    passwordOfUser: user.password || "",
  });

  if (!isValid) {
    return null;
  }

  return {
    id: `${user._id}`,
    email: email.toLowerCase(),
    name: user.name,
    role: user.role,
  };
};

export const oAuthUser = async (oAuthEmail: string, oauthName: string) => {
  await db.connect();
  const user = await User.findOne({ email: oAuthEmail });

  if (user) {
    await db.disconnect();
    const { _id, email, name, role } = user;
    return {
      id: `${_id}`,
      email: email.toLowerCase(),
      name,
      role,
    };
  }

  const newUser = new User({
    email: oAuthEmail,
    name: oauthName,
    password: "@",
    role: "client",
  });

  try {
    const savedUser = await newUser.save();
    await db.disconnect();
    const { _id, email, name, role } = savedUser;
    return {
      id: `${_id}`,
      email: email.toLowerCase(),
      name,
      role,
    };
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return null;
  }
};
