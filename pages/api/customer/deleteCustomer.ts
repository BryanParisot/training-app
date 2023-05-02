 
import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import prismadb from '@/libs/prismadb';


 export default async function handler(req: NextApiRequest, res: NextApiResponse){
 
    if (req.method  !== 'GET' && req.method  !== 'POST' ) {
        return res.status(405).end()
    }
     
    try {

        if (req.method === 'POST') {
            const { currentUser } = await serverAuth(req, res);
      
            const { clientId } = req.body;
      
            const customer = await prismadb.client.delete({
              where: {
                id: clientId,
              }
            });
      
            if (!customer) {
              throw new Error('Invalid ID');
            }

            return res.status(200).json(customer);

        }
        return res.status(405).end();
} catch (error) {
        console.log(error)
        return res.status(400).end();
    }
 }