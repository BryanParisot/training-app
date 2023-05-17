import Input from '@/components/Input';
import LineCharts from '@/components/charts/LineCharts';
import Loader from '@/components/loader/Loader';
import NavBar from '@/components/navBar/NavBar';
import useCustomer from '@/hooks/useCustomer';
import axios from 'axios';
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'



const Customer = () => {

    const [bras, setBras] = useState('')
    const router = useRouter();
    const { clientId } = router.query

    const { data: fetchedCustomer, isLoading, mutate: mutateCustomer } = useCustomer(clientId as string)

    const onSubmit = useCallback(async () => {
        try {
            const url = `/api/measurement?clientId=${clientId}`

            await axios.post(url, { bras })
            setBras('')
            mutateCustomer()
        } catch (error) {
            console.log('Erreur ici', clientId)

        }
    }, [bras, clientId, mutateCustomer])


    const mensuration = fetchedCustomer?.mensurations
    console.log(mensuration)
    return (
        <div className='flex h-full w-full '>
            {isLoading && <Loader />}
            <NavBar />
            <div className='flex flex-col  w-full p-10'>
                <span>Customer</span>
                <Input
                    label='bras'
                    id="bras"
                    type='number'
                    value={bras}
                    onChange={(e: any) => setBras(e.target.value)} />
                <button onClick={onSubmit}>Envoyer</button>

                <LineCharts key={mensuration} mensuration={mensuration} />

                {/* {mensuration?.map((i: any) => (
                    <span key={i.id}>{i.bras}</span>
                ))} */}
            </div>

        </div>
    )
}

export default Customer