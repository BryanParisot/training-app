 
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
            const {  nom, prenom, email, taille, age, objectif } = req.body;



            const customer = await prismadb.client.create({
                data: {
                    nom,
                    prenom,
                    email,
                    taille: parseInt(taille),
                    age: parseInt(age),
                    objectif,
                    userId: currentUser.id,
                }
            });

            return res.status(200).json(customer);
        }

        if (req.method === "GET") {
            const { userId } = req.query 

            let customers;

            if (userId && typeof userId === 'string') {
                customers = await prismadb.client.findMany({
                    where: {
                        userId
                    }, 
                    include:{
                        user: true,
                        mensurations: true
                    },                    
                })
            }else
            customers = await prismadb.client.findMany({
                include:{
                    user: true,
                    mensurations: true
                }

            })

            return res.status(200).json(customers);
        }

} catch (error) {
        console.log(error)
        return res.status(400).end();
    }
 }