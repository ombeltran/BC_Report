import React from 'react'

function CreateUsers() {
    return (
        <div className="flex flex-col justify-center items-center w-screen h-screen">
            <form
                className="flex flex-col gap-3 border-2 border-white rounded mb-6 px-6 pb-6 mt-12"
            >
                <h1 className="p-4 text-3xl font-bold my-4 text-center">New user register</h1>

                <div className="flex flex-col gap-4 px-5 max-w-[300px]">
                    <h3 className="text-2xl">User code</h3>
                    <input
                        className="border-2 border-slate-100/50 rounded p-2"
                        name="userCod"
                        placeholder="User code"
                    />
                </div>

                <div className="flex gap-4">
                    <div className="flex flex-col gap-4 px-5">
                        <h3 className="text-2xl">Name</h3>
                        <input
                            className="border-2 border-slate-100/50 rounded p-2 min-w-[250px]"
                            name="name"
                            placeholder="User name"
                        />
                    </div>

                    <div className="flex flex-col gap-4 px-5">
                        <h3 className="text-2xl">Last name</h3>
                        <input
                            className="border-2 border-slate-100/50 rounded p-2 min-w-[250px]"
                            name="lastName"
                            placeholder="User last name"
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex flex-col gap-4 px-5">
                        <h3 className="text-2xl">Password</h3>
                        <input
                            className="border-2 border-slate-100/50 rounded p-2 min-w-[250px]"
                            type="password"
                            name="password"
                            placeholder="Password"
                        />
                    </div>

                    <div className="flex flex-col gap-4 px-5">
                        <h3 className="text-2xl">Role</h3>
                        <input
                            className="border-2 border-slate-100/50 rounded p-2 min-w-[250px]"
                            name="role"
                            placeholder="User role"
                        />
                    </div>
                </div>

                <div className="pr-5 mt-10 text-end">
                    <input
                        className="border-2 border-slate-100/50 rounded p-2 w-[84px] bg-red-500 font-bold cursor-pointer"
                        type="submit"
                    />
                </div>
            </form>
        </div>
    )
}

export default CreateUsers