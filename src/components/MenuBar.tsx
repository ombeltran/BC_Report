"use client";

import { FiLogOut } from "react-icons/fi";
import { HiOutlineDownload } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";

function MenuBar() {
    const router = useRouter();
    const { user, setUser } = useUser();

    const handleLogout = async () => {
        setUser(null);
        await fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include",
        });
        router.replace("/");
    }

    return (
        <div className='flex justify-end pr-[2%] font-bold py-2 bg-slate-800/25 border-b-4 border-slate-800/5 w-full shadow-[0_6px_12px_-6px_rgba(255,255,255,0.3)]'>
            <ul className='flex flex-row gap-10 items-center px-6 sm:px-0'>
                <li>{user?.name ? `Welcome, ${user.name}` : "No hay usuario"}</li>

                <li
                    className="flex items-center gap-2 cursor-pointer hover:text-slate-200 transition"
                    onClick={handleLogout}
                >
                    <div className="bg-red-600 p-1 rounded-lg">
                        <FiLogOut />
                    </div>
                    Logout
                </li>

                {user?.role === 'master' && (
                    <li 
                    className="flex items-center gap-2 cursor-pointer hover:text-slate-200 transition"
                    onClick={() => window.open("/api/export", "_blank")}
                    >
                        <div className="bg-red-600 p-1 rounded-lg">
                            <HiOutlineDownload />
                        </div>
                        Download
                    </li>
                )}
            </ul>
        </div>
    );
}

export default MenuBar;
