"use client"
import { useUser } from "@/context/userContext";
import { useEffect, useState } from "react";

function ProductionPage() {

    interface User {
        id: number,
        codEmployee: number,
        name: String,
        lastName: String
    }

    const [userData, setUserData] = useState<User[]>([])
    const { user } = useUser();

    // const handleUsers = async () => {

    //     const res = await fetch('/api/auth/login', {
    //         method: 'GET',
    //         credentials: "include", // Incluir cookies en la solicitud
    //     });

    //     if (!res.ok) {
    //         throw new Error("No autorizado o fallo en la petición");
    //     }

    //     const data = await res.json()
    //     return data
    // }

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         try {
    //             const data = await handleUsers();
    //             // console.log(data);
    //             setUserData(data)
    //         } catch (error) {
    //             console.error('Error al obtener usuarios:', error);
    //         }
    //     };

    //     fetchUsers();
    // }, []);

    type FormData = {
        brand: string;
        model: string;
        serial_N: string;
        category: string;
        note: string;
        complete: string;
        user: string;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget; // mucho mejor que e.target

        const data: FormData = {
            brand: form.brand.value,
            model: form.model.value,
            serial_N: form.serial_N.value,
            category: form.category.value,
            note: form.note.value,
            complete: form.complete.value,
            user: form.user.value,
        };

        console.log("Formulario enviado", data);
    };

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
                        <select
                            //className="border-2 border-slate-100/50 rounded p-2 sm:min-w-[334px] w-[250px]"
                            className="border-2 border-slate-100/50 rounded py-2 px-1 sm:min-w-[334px] w-[250px] text-gray-500"
                            name="complete"
                            id="complete"
                        >
                            <option value="" defaultValue="" className="text-black">Select a value</option>
                            <option value="Samsung" className="text-black">Samsung</option>
                            <option value="LG" className="text-black">LG</option>
                            <option value="Sony" className="text-black">Sony</option>
                        </select>
                    </div>

                    {/* Model section */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:justify-between justify-center sm:ml-0 ml-2">
                        <h3 className="text-2xl ">Model:</h3>
                        <select
                            //className="border-2 border-slate-100/50 rounded p-2 sm:min-w-[334px] w-[250px]"
                            className="border-2 border-slate-100/50 rounded py-2 px-1 sm:min-w-[334px] w-[250px] text-gray-500"
                            name="complete"
                            id="complete"
                        >
                            <option value="" defaultValue="" className="text-black">Select a value</option>
                            <option value="Samsung" className="text-black">QN65LS03PUA</option>
                            <option value="LG" className="text-black">OLED65B4PUA</option>
                            <option value="Sony" className="text-black">K-85XR90K</option>
                        </select>
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
                        <div
                            className="border-2 border-slate-100/50 rounded p-2 sm:min-w-[334px] w-[250px]"
                        >
                            {
                                user && user
                            }
                        </div>
                        
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