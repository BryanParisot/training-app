import useCustomers from '@/hooks/useCustomers'
import React from 'react'
import CustomerItem from './CustomerItem'

interface CardCustomerProps {
    userId?: string
}



const CustomerCard: React.FC<CardCustomerProps> = ({ userId }) => {

    const { data: clients = [] } = useCustomers(userId)
    return (
        <>
            {clients.map((item: Record<string, any>) => (
                <CustomerItem
                    userId={userId}
                    key={item.id}
                    data={item}
                />
            ))}
        </>
    )
}

export default CustomerCard