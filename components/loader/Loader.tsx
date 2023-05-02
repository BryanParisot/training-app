import React from 'react'
import { Puff } from 'react-loader-spinner'


const Loader = () => {
    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex flex-col min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <Puff
                        color='white'
                    />
                    <p className='text-white'>Chargement</p>
                </div>
            </div>
        </div>
    )
}

export default Loader