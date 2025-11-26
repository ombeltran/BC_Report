"use client";
import { useUser } from "@/context/userContext";
import { useRouter } from "next/navigation";

function Login() {
  const { setUser } = useUser();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const loginData = {
      codEmployee: Number(form.employeeCod.value),
      password: form.password.value,
    };

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(loginData),
    });

    const data = await response.json();
    
    if (response.ok) {
      // Update UserContext
      setUser({ id: data.id, name: data.name, lastName: data.lastName, role: data.role });

      // Persist for refresh
      localStorage.setItem("user", JSON.stringify(data.user));

      form.reset();

      router.push("/features/production");
    } else {
      // console.error("Error en login:", data.error);
      alert("Your user name or your password are wrong. Please try again");
      form.reset();
      router.replace("/");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen">
      <h1 className="p-4 text-4xl font-bold my-12 text-center">Login</h1>

      <form
        className="flex flex-col gap-3 px-4 border-2 p-8 border-white rounded sm:min-w-[200px] mb-6"
        onSubmit={handleLogin}
      >

        <div className="flex flex-col gap-4 px-5">
          <h3 className="text-2xl">Employee code</h3>
          <input
            className="border-2 border-slate-100/50 rounded p-2 sm:min-w-[200px]"
            name="employeeCod"
            placeholder="Employee code"
          />
        </div>

        <div className="flex flex-col gap-4 px-5">
          <h3 className="text-2xl">Password</h3>
          <input
            className="border-2 border-slate-100/50 rounded p-2 sm:min-w-[200px]"
            type="password"
            name="password"
            placeholder="Password"
          />
        </div>

        <div className="pr-5 mt-10 text-end">
          <input
            className="border-2 border-slate-100/50 rounded p-2 w-[84px] bg-red-500 font-bold cursor-pointer"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}

export default Login;
