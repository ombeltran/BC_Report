import React from 'react'
import { Metadata } from 'next'
// import Counter from '@/components/Counter'
import ProductionPage from './features/production/page'

export const metadata: Metadata = {
    title: 'Beach Camera'
}

function Page() {
    return (
        // <div className='p-4 text-4xl font-bold'>
        <div>
            {/* <Counter /> */}
            <ProductionPage />
        </div>
    )
}

export default Page
