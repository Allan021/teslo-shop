import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { IOrder } from '../../../interfaces';
import { Order } from '../../../models';


type Data = {
    message: string;
} | IOrder[]

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case "GET":
            return getOders(req, res);

        default:
            return res.status(405).json({ message: "Method not allowed" });
    }
}

const getOders = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    await db.connect();

    const orders = await Order.find({}).populate('user', 'name email').lean();

    await db.disconnect();

    return res.status(200).json(orders);
}