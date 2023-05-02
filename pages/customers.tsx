/* eslint-disable react-hooks/rules-of-hooks */
import CustomerCard from '@/components/customers/CustomerCard'
import FormCustomer from '@/components/form/FormCustomer'
import NavBar from '@/components/navBar/NavBar'
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import React, { useState } from 'react'
import { BiUserPlus } from 'react-icons/bi'

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context)

    if (!session) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            }
        }
    }
    return {
        props: {}
    }
}


export default function customers() {

    const [visible, setVisible] = useState(false)

    return (
        <div className='flex h-full w-full'>
            <NavBar />
            <div className='flex flex-col w-full'>
                <div className='w-full grid grid-cols-2 gap-3 p-10 '>
                    <CustomerCard />
                </div>
                <div className='flex items-center w-full justify-center'>
                    <button className="mb-4 w-3/6 flex justify-center cursor-pointer items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => setVisible(true)}>
                        <BiUserPlus className='text-lg' />
                        Ajouter un client
                    </button>
                </div>

                {visible && <FormCustomer modalVisible={setVisible} />}
            </div>
        </div>
    )
}