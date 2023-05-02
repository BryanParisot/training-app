import useCurrentUser from '@/hooks/useCurrentUser'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { AiOutlineHome, AiOutlineUsergroupAdd, AiOutlinePoweroff } from 'react-icons/ai'


const navigation = [
    { name: 'Accueil', href: '/dashboard', icon: AiOutlineHome },
    { name: 'Clients', href: '/customers', icon: AiOutlineUsergroupAdd },
    { name: 'Partenaire', href: '/dashboard', icon: AiOutlineHome },
]

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function NavBar() {
    const { data: user } = useCurrentUser()

    const router = useRouter();
    return (
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r h-full w-1/6 border-gray-200 bg-white px-6">
            <div className="flex h-16 shrink-0 items-center">
                <Image
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                    width={100}
                    height={100}
                />
            </div>
            <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                                <li key={item.name}>
                                    <a
                                        href={item.href}
                                        className={classNames(
                                            router.pathname == item.href
                                                ? 'bg-gray-50 text-indigo-600'
                                                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                        )}
                                    >
                                        <item.icon
                                            className={classNames(
                                                router.pathname == item.href ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                                'h-6 w-6 shrink-0'
                                            )}
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li className="-mx-6 mt-auto">
                        <span
                            className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                        >
                            <Image
                                className="h-8 w-8 rounded-full bg-gray-50"
                                src={user?.image}
                                alt="Photo de profil"
                                width={100}
                                height={100}

                            />
                            <div className='flex justify-between items-center w-full'>
                                <span aria-hidden="true">{user?.name}</span>
                                <AiOutlinePoweroff onClick={() => signOut()} className='text-xl cursor-pointer' />
                            </div>
                        </span>
                    </li>
                </ul>
            </nav>
        </div>
    )
}