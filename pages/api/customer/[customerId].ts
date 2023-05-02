import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { customerId } = req.query;

    if (!customerId || typeof customerId !== 'string') {
      throw new Error('Invalid ID');
    }

    const post = await prismadb.client.findUnique({
      where: {
        id: customerId,
      },
      include: {
        user: true,
        mensurations:{
          include : {
            user: true
          }
        }
        },
    });

    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}