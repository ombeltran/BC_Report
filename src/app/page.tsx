import { Metadata } from 'next'
import Login from './features/login/page'

export const metadata: Metadata = {
    title: 'Beach Camera'
}

function Page() {
    return (
        <div>
            <Login />
        </div>
    )
}

export default Page
