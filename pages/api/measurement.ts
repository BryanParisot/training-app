 
import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import prismadb from '@/libs/prismadb';


export default async function handler(req: NextApiRequest, res: NextApiResponse) { 
    if (req.method  !== 'POST' ) {
        return res.status(405).end()
    }
     
    try {
        if (req.method === 'POST') {
            const { currentUser } = await serverAuth(req, res);
            const { bras } = req.body;
            const { clientId } = req.query

            if (!clientId || typeof clientId !== 'string') {
                throw new Error('Invalid Id')
            }

            const measurement = await prismadb.mensuration.create({
                data: {
                    bras : parseInt(bras),
                    userId: currentUser.id,
                    clientId
                }
            });

            return res.status(200).json(measurement);
        }
                   
    } catch (error) {
        console.log(error)
        return res.status(400).end();
    }
 }