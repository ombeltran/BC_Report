'use client'
import { log } from "console";
import { useEffect, useState } from "react";

function CreateUsers() {
    const [users, setUsers] = useState<UserFormData[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserFormData | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("/api/auth/register", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

                const data = await res.json();
                // console.log("Users:", data);
                setUsers(data);
            } catch (err) {
                console.error("Error fetching users:", err);
            }
        }

        fetchUsers();
    }, []);


    type UserFormData = {
        codEmployee: number;
        name: string;
        lastName: string;
        password: string;
        role: string;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;

        try {
            const formData = new FormData(form);

            //Validation if userCod is a number
            const codEmployeeValue = formData.get("codEmployee");
            if (isNaN(Number(codEmployeeValue))) {
                alert("User code must be a number");
                return;
            }

            // Validate if the form fields are filled
            if (!codEmployeeValue) {
                alert("Please the user code field is required");
                return;
            }

            const name = formData.get("name");
            if (!name) {
                alert("Please the name field is required");
                return;
            }

            const lastName = formData.get("name");
            if (!lastName) {
                alert("Please the last name field is required");
                return;
            }

            const password = formData.get("password");
            if (!password) {
                alert("Please the password field is required");
                return;
            }

            const registerData: UserFormData = {
                codEmployee: Number(formData.get("userCod")),
                name: formData.get("name") as string,
                lastName: formData.get("lastName") as string,
                password: formData.get("password") as string,
                role: formData.get("role") as string,
            };

            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(registerData),
            });

            if (response.ok) {
                alert("User created successfully");
                form.reset(); // <-- Ya no usamos e.currentTarget
            }

        } catch (error) {
            alert("Error creating user: " + error);
        }
    };

    const handleEdit = (item: UserFormData) => {
        setSelectedUser(item);
    };

    const hadleDelete = (item: number) => {
        console.log(`This is the number ${item}`);

    }

    return (
        <div className="flex flex-row justify-center items-center gap-24 w-screen h-screen">
            <div className="flex flex-col justify-center items-center w-[550px] h-[550px]">
                <form
                    className="flex flex-col gap-3 border-2 border-white rounded p-6 overflow-auto"
                    onSubmit={handleSubmit}
                >
                    <h1 className="p-4 text-3xl font-bold my-4 text-center">New user register</h1>

                    <div className="flex flex-col gap-4 px-5 max-w-[300px]">
                        <h3 className="text-2xl">User code</h3>
                        <input
                            className="border-2 border-slate-100/50 rounded p-2"
                            name="codEmployee"
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
                                onChange={(e) => setSelectedUser(prev => prev ? { ...prev, name: e.target.value } : null)}
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
                                className="border-2 border-slate-100/50 rounded p-2 min-w-[250px] bg-slate-900"
                                name="role"
                                placeholder="User role"
                                defaultValue="user"
                                readOnly
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
            <div className="flex flex-col border-2 border-white rounded w-[610px] h-[550px] py-10 overflow-auto">
                <div className="flex px-[8%] font-bold text-2xl mb-6">
                    <div className="w-28 mr-8">User code</div>
                    <div className="w-12 mr-10">Name</div>
                    <div className="w-32">Last Name</div>
                </div>

                {
                    users.map((item) =>
                        <div
                            key={item.codEmployee}
                            className="flex px-[4%] py-3 mb-4 bg-gray-950/70"
                        >
                            <div className="w-20 ml-[58px]">{item.codEmployee}</div>
                            <div className="w-[85px] ml-[69px]">{item.name}</div>
                            <div className="w-32 ml-[65px]">{item.lastName}</div>
                            <button
                                className="w-16 ml-[32px] px-4 text-center bg-green-700 rounded-[7px] font-bold"
                                onClick={() => handleEdit(item)}
                            >
                                Edit
                            </button>
                            <button
                                className="w-16 ml-[22px] mr-[10px] px-2 text-center bg-red-700 rounded-[7px] font-bold"
                                onClick={() => hadleDelete(item.codEmployee)}
                            >
                                Delete
                            </button>
                        </div>
                    )


                }
            </div>
        </div>
    )
}

export default CreateUsers