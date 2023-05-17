import axios from "axios"
import useCurrentUser from "@/hooks/useCurrentUser"
import useCustomers from "@/hooks/useCustomers"
import { useCallback, useState } from "react"
import Input from "../inputs/Input"
import { toast } from "react-hot-toast"
import Loader from "../loader/Loader"


interface FormCustomerProps {
    modalVisible: any
}

const FormCustomer: React.FC<FormCustomerProps> = ({ modalVisible }) => {

    const { data: user } = useCurrentUser()
    const { mutate: mutateCustomer } = useCustomers()


    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [taille, setTaille] = useState('');
    const [age, setAge] = useState('');
    const [objectif, setObjectif] = useState('');
    const [email, setEmail] = useState('');

    const [isLoading, setIsLoading] = useState(false)


    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true)
            await axios.post('/api/customer', { nom, prenom, email, taille, age, objectif })

            setNom('')
            setPrenom('')
            setTaille('')
            setAge('')
            setObjectif('')
            setEmail('')
            mutateCustomer()
            modalVisible(false)
        } catch (error) {
            console.log('Une erreur est survenue :', (error))
            toast.error('Une erreur est survenue');
        } finally {
            setIsLoading(false)
            toast.success('Le client a été crée avec succes');
        }

    }, [nom, prenom, email, taille, age, objectif, mutateCustomer, modalVisible])

    return (
        <div>
            {isLoading && <span> <Loader /> </span>}
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 "></div>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 mb-4">Ajouter un utilisateur</h2>

                            <div className="space-y-6" >
                                <div>
                                    <Input name="email" type="email" label="Adresse email" id="email" value={email} onChange={(e: any) => setEmail(e.target.value)} />
                                    <Input name="nom" type="text" label="Nom" id="nom" value={nom} onChange={(e: any) => setNom(e.target.value)} />
                                    <Input name="prenom" type="text" label="Prenom" id="prenom" value={prenom} onChange={(e: any) => setPrenom(e.target.value)} />
                                    <Input name="taille" type="number" label="Taille" id="taille" value={taille} onChange={(e: any) => setTaille(e.target.value)} />
                                    <Input name="age" type="number" label="Age" id="age" value={age} onChange={(e: any) => setAge(e.target.value)} />
                                    <Input name="objectif" type="text" label="Objectif" id="objectif" value={objectif} onChange={(e: any) => setObjectif(e.target.value)} />
                                </div>
                                <div>
                                    <button disabled={isLoading} onClick={onSubmit} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Ajouter</button>
                                    <button onClick={() => modalVisible(false)} >close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <Input
                id="name"
                type="text"
                label="name"
                value={nom}

                onChange={(e: any) => setNom(e.target.value)}
            /> */}
            {/* <button disabled={isLoading} onClick={onSubmit}>Envoyer </button> */}
        </div>
    )
}

export default FormCustomer