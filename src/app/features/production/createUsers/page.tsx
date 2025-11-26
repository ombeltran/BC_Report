'use client'

function CreateUsers() {
    
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
                codEmployee: Number(formData.get("codEmployee")),
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
                form.reset();
            }

        } catch (error) {
            alert("Error creating user: " + error);
        }
    };

    return (
        <div className="flex flex-row justify-center mt-[40%] sm:mt-[4%] w-screen h-screen">
            <div className="flex flex-col justify-center items-center w-[550px] h-[550px]">
                <form
                    className="flex flex-col gap-3 border-2 border-white rounded p-6"
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

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex flex-col gap-4 px-5">
                            <h3 className="text-2xl">Name</h3>
                            <input
                                className="border-2 border-slate-100/50 rounded p-2 max-w-[250px] sm:min-w-[250px]"
                                name="name"
                                placeholder="User name"
                            />
                        </div>

                        <div className="flex flex-col gap-4 px-5">
                            <h3 className="text-2xl">Last name</h3>
                            <input
                                className="border-2 border-slate-100/50 rounded p-2 max-w-[250px] sm:min-w-[250px]"
                                name="lastName"
                                placeholder="User last name"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex flex-col gap-4 px-5">
                            <h3 className="text-2xl">Password</h3>
                            <input
                                className="border-2 border-slate-100/50 rounded p-2 max-w-[250px] sm:min-w-[250px]"
                                type="password"
                                name="password"
                                placeholder="Password"
                            />
                        </div>

                        <div className="flex flex-col gap-4 px-5">
                            <h3 className="text-2xl">Role</h3>
                            <input
                                className="border-2 border-slate-100/50 rounded p-2 max-w-[250px] sm:min-w-[250px] bg-slate-900"
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
        </div>
    )
}

export default CreateUsers