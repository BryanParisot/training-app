import React from 'react'

interface InputProps {
    id: string;
    onChange: any;
    value: string;
    label: string;
    type?: string;
    name: string;

}

const Input: React.FC<InputProps> = ({ id, onChange, value, label, type, name }) => {
    return (
        <>
            <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
            <div className="mt-2">
                <input id={id} value={value} name={name} type={type} onChange={onChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>

        </>
    )
}

export default Input