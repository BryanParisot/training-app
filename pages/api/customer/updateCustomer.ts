 
import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import prismadb from '@/libs/prismadb';


 export default async function handler(req: NextApiRequest, res: NextApiResponse){
 
    if (req.method  !== 'GET' && req.method  !== 'POST' ) {
        return res.status(405).end()
    }
     
    try {
        if (req.method === "POST") {
            const { clientId, nom, prenom, taille, age, objectif } = req.body 

            const customer = await prismadb.client.update({
                where:{
                    id: clientId
                }, 
                data : {
                     nom,
                     prenom,
                     taille : parseInt(taille),
                     age: parseInt(age),
                     objectif
                }
            })

            if (!customer) {
                throw new Error('Invalid ID');
              }
  
              return res.status(200).json(customer);

        }

} catch (error) {
        console.log(error)
        return res.status(400).end();
    }
 }