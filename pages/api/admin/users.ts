import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { IUser } from '../../../interfaces';
import { User } from '../../../models';
import { isValidObjectId } from 'mongoose';

type Data = {
    message: string;
} | IUser[]

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case "GET":
            return getUsers(req, res);

        case "PUT":
            return updateUser(req, res);

        case "DELETE":
            return deleteUser(req, res);


        default:
            return res.status(405).json({ message: "Method not allowed" });
    }
}

const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    await db.connect();

    const users = await User.find({}).select("-password").lean();

    await db.disconnect();

    return res.status(200).json(users);
}

const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { userId = "", role = "" } = req.body;


    if (!userId || !role) {
        return res.status(400).json({ message: "Bad request" });
    }

    if (!isValidObjectId(userId)) {
        return res.status(400).json({ message: "Invalid user id" });
    }

    const validRoles = ["admin", "client", "seller", 'super-user'];

    if (!validRoles.includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
    }

    try {

        await db.connect();

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.role = role;

        await user.save();

        await db.disconnect();

        return res.status(201).json({ message: "User updated" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }




}

const deleteUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { userId = "" } = req.body;

    if (!userId) {
        return res.status(400).json({ message: "Bad request" });
    }

    if (!isValidObjectId(userId)) {
        return res.status(400).json({ message: "Invalid user id" });
    }

    try {

        await db.connect();

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.remove();

        await db.disconnect();
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}
