import React from 'react'
import { Metadata } from 'next'
import Login from './features/login/page'
import CreateUsers from './features/production/createUsers/page'

export const metadata: Metadata = {
    title: 'Beach Camera'
}

function Page() {
    return (
        <div>
            <Login />
            {/* <CreateUsers /> */}
        </div>
    )
}

export default Page
