'use client'
import { useRouter } from "next/navigation";


function Login() {

    type loginProps = {
        employeeCod: number;
        password: string;
    }

    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;

        const loginData = {
            codEmployee: Number(form.employeeCod.value),
            password: form.password.value,
        };

        console.log(loginData);

        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData),
        });

        if (response.ok) {
            // const data = await response.json();
            // console.log("Login exitoso!", data);
            form.reset();
            router.push("features/production");
        } else {
            const error = await response.json();
            console.error("Error en login:", error.error);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center w-screen">
            <h1 className="p-4 text-4xl font-bold my-12 text-center"> Login</h1>
            <div className="flex flex-col justify-center items-center">
                <form
                    className="flex flex-col gap-3 px-4 border-2 p-8 border-white rounded sm:min-w-[200px] mb-6"
                    action=""
                    onSubmit={handleLogin}
                >

                    {/* Code employee */}
                    <div className="flex flex-col gap-4 sm:justify-between justify-center px-5">
                        <h3 className="text-2xl ">Employee code</h3>
                        <input
                            className="border-2 border-slate-100/50 rounded p-2 sm:min-w-[200px] "
                            type="text"
                            name="employeeCod"
                            autoComplete="employee-code"
                            placeholder="Type your employee code here"
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-4 sm:justify-between justify-center px-5">
                        <h3 className="text-2xl ">Password</h3>
                        <input
                            className="border-2 border-slate-100/50 rounded p-2 sm:min-w-[200px]"
                            type="password"
                            name="password"
                            autoComplete="current-password"
                            placeholder="Type your password here"
                        />
                    </div>

                    {/* Submit button */}
                    <div className="sm:ml-0 pr-5 mt-10 text-end">
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

export default Login