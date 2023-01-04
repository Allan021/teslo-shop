import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { db } from "../../../database";
import { Paypal } from "../../../interfaces";
import Order from "../../../models/Order";
import { isValidObjectId } from 'mongoose';

type Response =
    | {
        message: string;
    }


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response>
) {
    const { method } = req;
    switch (method) {
        case "POST":
            return verifyPay(req, res);

        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method method Not Allowed`);
    }
}
const getPaypalBearerToken = async (): Promise<string | null> => {

    const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_SECRET;
    const OAUTH_URL = process.env.PAYPAL_OAUTH_URL || "";

    const base64 = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`);

    const body = new URLSearchParams('grant_type=client_credentials');


    try {
        const { data } = await axios.post(OAUTH_URL, body, {
            headers: {
                'Authorization': `Basic ${base64.toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        return data.access_token;

    } catch (error) {

        if (axios.isAxiosError(error)) {
            console.log(error.response?.data)
        } else {
            console.log(error)
        }

        return null;

    }
}

const verifyPay = async (
    req: NextApiRequest,
    res: NextApiResponse<Response>
) => {


    const token = await getPaypalBearerToken();

    if (!token) {
        return res.status(400).json({ message: "Error getting token from paypal" });
    }


    const session = await getSession({ req });

    if (!session) {
        return res.status(400).json({ message: "User not logged in" });
    }

    const { transactionID = "", orderID = "" } = req.body;
    if (!isValidObjectId(orderID)) {
        return res.status(400).json({ message: "Invalid orderID" });

    }


    if (!transactionID || !orderID) {
        return res.status(400).json({ message: "Missing transactionID or orderID" });
    }

    const PAYPAL_ORDER_URL = process.env.PAYPAL_ORDERS_URL || "";

    try {

        const { data } = await axios.get<Paypal.PaypalOrderStatusResponse>(`${PAYPAL_ORDER_URL}/${transactionID}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });



        if (data.status !== "COMPLETED") {
            return res.status(400).json({ message: "Order not completed" });
        }

        await db.connect();
        const order = await Order.findById(orderID);

        if (!order) {
            return res.status(400).json({ message: "Order not found" });
        }


        //validar que el monto de la orden sea igual al monto de la transaccion
        const { purchase_units, id } = data;
        const amount = Number(purchase_units[0].amount.value);

        if (amount !== order.total) {
            return res.status(400).json({ message: "Order amount not equal to transaction amount" });
        }

        order.isPaid = true;
        order.paidAt = new Date().toISOString();
        order.paymentResult = id;
        await order.save();

        return res.status(200).json({ message: "Order verified" });

    } catch (error) {

        if (axios.isAxiosError(error)) {
            console.log(error.response?.data)
        } else {
            console.log(error)
        }

        return res.status(400).json({ message: "Error getting order from paypal" });

    }



};

