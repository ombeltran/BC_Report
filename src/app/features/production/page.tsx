"use client"

import { useEffect, useState } from "react";

function ProductionPage() {

    interface User {
        id: number,
        codEmployee: number,
        name: String,
        lastName: String
    }

    const [userData, setUserData] = useState<User[]>([])


    const handleUsers = async () => {
        const secretToken = process.env.NEXT_PUBLIC_TOKEN_SECRET

        const res = await fetch('/api/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${secretToken}`
            }
        })

        const data = await res.json()
        return data
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await handleUsers();
                // console.log(data);
                setUserData(data)
            } catch (error) {
                console.error('Error al obtener usuarios:', error);
            }
        };

        fetchUsers();
    }, []);



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Formulario enviado');

        // const res = await fetch('/api/production', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Bearer tu_token_secreto' // si usas middleware
        //     },
        //     body: JSON.stringify(form)
        // })

        // const data = await res.json()
        // console.log('Registro creado:', data)
    }

    return (
        <div className="flex flex-col justify-center items-center w-screen">
            <h1 className="p-4 text-4xl font-bold sm:m-12 m7 text-center">Productivity Record</h1>
            <div className="flex flex-col justify-center items-center">
                <form
                    className="flex flex-col gap-3 px-4 border-2 p-8 border-white rounded sm:min-w-[600px] mb-6"
                    action=""
                    onSubmit={handleSubmit}>

                    {/* Brand section */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:justify-between justify-center sm:ml-0 ml-2">
                        <h3 className="text-2xl ">Brand:</h3>
                        <input
                            className="border-2 border-slate-100/50 rounded p-2 sm:min-w-[334px] w-[250px]"
                            type="text"
                            name="brand"
                            placeholder="Report brand here"
                        />
                    </div>

                    {/* Model section */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:justify-between justify-center sm:ml-0 ml-2">
                        <h3 className="text-2xl ">Model:</h3>
                        <input
                            className="border-2 border-slate-100/50 rounded p-2 sm:min-w-[334px] w-[250px]"
                            type="text"
                            name="model"
                            placeholder="Report model here"
                        />
                    </div>

                    {/* Serial number */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:justify-between justify-center sm:ml-0 ml-2">
                        <h3 className="text-2xl ">Serial number:</h3>
                        <input
                            className="border-2 border-slate-100/50 rounded p-2 sm:min-w-[334px] w-[250px]"
                            type="text"
                            name="serial_N"
                            placeholder="Report serial number here"
                        />
                    </div>

                    {/* Category */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:justify-between justify-center sm:ml-0 ml-2">
                        <h3 className="text-2xl ">Category:</h3>
                        <input
                            className="border-2 border-slate-100/50 rounded p-2 sm:min-w-[334px] w-[250px]"
                            type="text"
                            name="category"
                            placeholder="Report category here"
                        />
                    </div>

                    {/* Note */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:justify-between justify-center sm:ml-0 ml-2">
                        <h3 className="text-2xl ">Note:</h3>
                        <textarea
                            className="border-2 border-slate-100/50 rounded p-2 sm:min-w-[334px] w-[250px] min-h-[70px]"
                            name="note"
                            id="note"
                            placeholder="Report note here"
                        />
                    </div>

                    {/* Complete */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:justify-between justify-center sm:ml-0 ml-2">
                        <h3 className="text-2xl ">Complete:</h3>
                        <select
                        //className="border-2 border-slate-100/50 rounded p-2 sm:min-w-[334px] w-[250px]"
                            className="border-2 border-slate-100/50 rounded p-2 sm:min-w-[334px] w-[250px]"
                            name="complete"
                            id="complete"
                        >
                            <option value="" defaultValue="" className="text-black">Select a value</option>
                            <option value="true" className="text-black">true</option>
                            <option value="false" className="text-black">false</option>
                        </select>
                    </div>

                    {/* User */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:justify-between justify-center sm:ml-0 ml-2">
                        <h3 className="text-2xl ">User:</h3>
                        <select
                            //className="border-2 border-slate-100/50 rounded p-2 sm:min-w-[334px] w-[250px]"
                            className="border-2 border-slate-100/50 rounded p-2 sm:min-w-[334px] w-[250px]"
                            name="user"
                            id="user"
                        >
                            <option value="" defaultValue="" className="text-black">Select a value</option>
                            {userData.map(user => (
                                <option className="text-black" key={user.id} value={user.id}>
                                    {user.name} {user.lastName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="sm:ml-0 ml-2 mt-2 text-end">
                        <input
                            className="border-2 border-slate-100/50 rounded p-2 w-[84px] bg-red-500 font-bold cursor-pointer"
                            type="submit"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductionPage