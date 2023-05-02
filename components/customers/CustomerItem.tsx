import useCurrentUser from '@/hooks/useCurrentUser'
import useCustomers from '@/hooks/useCustomers'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'
import { RiDeleteBin5Line } from 'react-icons/ri'
import Loader from '../loader/Loader'



interface CustomerItemProps {
    data: Record<string, any>
    userId?: string
}

const CustomerItem: React.FC<CustomerItemProps> = ({ data = {}, userId }) => {
    const router = useRouter()
    const { mutate: mutateCustomer } = useCustomers()
    const [isLoading, setIsLoading] = useState(false)
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [taille, setTaille] = useState('')
    const [age, setAge] = useState('')
    const [objectif, setObjectif] = useState('')
    const [modified, setModified] = useState(false)



    const goCustomer = useCallback(() => {
        router.push(`customer/${data.id}`)

    }, [router, data.id])


    const deleteUser = useCallback(async () => {
        try {
            setIsLoading(true)
            const clientId = data.id;
            await axios.post('api/customer/deleteCustomer', { clientId })
            mutateCustomer()

        } catch (error) {
            console.log(error)
            toast.error('Une erreur est survenue');
        } finally {
            setIsLoading(false)
            toast.success('Client supprimé avec succes')
        }
    }, [data.id, mutateCustomer])


    const modifiedUser = useCallback(async () => {
        try {
            setIsLoading(true)
            const clientId = data.id
            await axios.post('api/customer/updateCustomer', { nom, prenom, taille, age, objectif, clientId })
            mutateCustomer()

        } catch (error) {
            console.log(error)
        } finally {
            setModified(false)
            setIsLoading(false)
            toast.success('L\'utilisateur a été mise à jour');

        }
    }, [data, nom, prenom, taille, age, objectif, mutateCustomer])

    const modifiefInputWithValueCustomer = useCallback(async () => (
        setModified(true),
        setNom(data.nom),
        setPrenom(data.prenom),
        setTaille(data.taille),
        setAge(data.age),
        setObjectif(data.objectif)

    ), [data])

    return (
        <div className='ml-4'>
            {isLoading && <Loader />}

            <div className="bg-white shadow-lg w-[600px] h-72 rounded  p-6">
                <div className='flex h-full'>
                    <div className='w-full flex flex-col  items-stretch'>
                        <div className='flex '>
                            <div className='flex items-center justify-between  rounded-t'>
                                <span className="inline-block h-32 w-32 overflow-hidden rounded-full bg-gray-100">
                                    <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </span>
                            </div>
                            <div className='w-full ml-10'>
                                <div className='flex justify-between items-center border-b border-gray-300'>
                                    <div>
                                        <div className='font-semibold uppercase'>
                                            {modified === true ?
                                                <div>
                                                    <input className='bg-gray-50 px-1  w-2/4 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-indigo-600' type='text' value={nom} onChange={(e: any) => setNom(e.target.value)} />
                                                    <input className='bg-gray-50 px-1  w-2/4 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-indigo-600' type='text' value={prenom} onChange={(e: any) => setPrenom(e.target.value)} />
                                                </div>
                                                : <span>{data.nom} {data.prenom}</span>}
                                            {/* {data.nom} {data.prenom} */}
                                        </div>
                                        <span className='text-gray-400 text-xs'> {data.email}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={deleteUser}
                                        className="mb-4 cursor-pointer inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        < RiDeleteBin5Line className="-ml-0.5 h-4 w-4 " aria-hidden="true" />
                                        Supprimer
                                    </button>
                                </div>
                                <ul className='flex flex-col flex-wrap p-2 justify-between space-y-3'>
                                    <li className='text-gray-600 flex justify-between'> <span className='text-gray-400 mr-4'> Poids </span>  120 kg</li>
                                    <li className='text-gray-600 flex justify-between'>
                                        <span className='text-gray-400 mr-4'> Taille</span>
                                        {modified === true ?
                                            < input className='bg-gray-50 px-1  w-2/4 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-indigo-600' type='number' value={taille} onChange={(e: any) => setTaille(e.target.value)} />
                                            : <div> <span>{data.taille} </span> cm </div>}
                                    </li>
                                    <li className='text-gray-600 flex justify-between'>
                                        <span className='text-gray-400 mr-4'> Age</span>
                                        {modified === true ?
                                            < input className='bg-gray-50 px-1  w-2/4 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-indigo-600' type='number' value={age} onChange={(e: any) => setAge(e.target.value)} />
                                            : <div> <span>{data.age} </span> ans </div>}
                                    </li>
                                    <li className='text-gray-600 flex justify-between'>
                                        <span className='text-gray-400 mr-4'> Objectif</span>
                                        {modified === true ?
                                            < input className='bg-gray-50 px-1  w-2/4 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-indigo-600' type='text' value={objectif} onChange={(e: any) => setObjectif(e.target.value)} />
                                            : <div> <span>{data.objectif} </span> </div>}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='flex justify-end space-x-3 p-2'>
                            {modified === false ? <button onClick={goCustomer} type="button" className="rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Profil</button>
                                : <button onClick={() => setModified(false)} type="button" className="rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Annuler</button>}
                            {!modified && <button onClick={modifiefInputWithValueCustomer} type="button" className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Modifier</button>}
                            {modified && <button onClick={modifiedUser} disabled={isLoading} type="button" className="disabled:cursor-wait rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Enregister</button>}
                            {/* <span onClick={modifiefInput} className='text-lg cursor-pointer hover:scale-125 hover:transition'><RxPencil2 /></span> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* <FormCustomer/> */}
            {/* <input onChange={(e: any) => setNom(e.target.value)}
                value={nom} type='text' />
            <button onClick={modifiedUser}>update</button> */}
        </div >
    )
}

export default CustomerItem