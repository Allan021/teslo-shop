import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(400).json({ message: "Debe ingresar su busqueda" });
}
