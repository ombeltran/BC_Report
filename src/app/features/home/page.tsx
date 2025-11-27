"use client";

import Link from "next/link";
import { useUser } from "@/context/userContext";
import { getMenuForRole } from "@/libs/getMenuForRole";
import { MenuItem } from "@/config/menu";
import { useRouter } from "next/navigation";

function Home() {
    const { user } = useUser();
    const router = useRouter();

    if (!user) return null;

    const menuItems: MenuItem[] = getMenuForRole(user.role);

    return (
        <div className="flex flex-col items-center mt-[10%] w-screen">
            <h1 className="mb-[10%] text-center text-7xl">{`Welcome, ${user.name} ${user.lastName}!`}</h1>
            <div className="flex items-center w-[calc(100%-12rem)] gap-12 flex-wrap justify-center">
                {menuItems.slice(1).map(item => (
                    (item.label !== "Logout" &&
                        <Link key={item.label} href={item.path}>
                            <div
                                className="flex flex-col gap-3 p-4 bg-slate-300/70 h-[280px] w-[320px] rounded-md mt-4 text-black font-bold cursor-pointer hover:bg-slate-300/90 hover:shadow-lg hover:scale-105 transition-all"
                            >
                                <p className="text-5xl text-white bg-red-600 p-2 w-fit rounded-lg">{item.icon && <item.icon />}</p>

                                <div className="flex justify-between">
                                    <h3 className="text-2xl">{item.label}</h3>
                                    {
                                        item.children &&
                                        <div className="flex flex-col gap-1 mr-6">
                                            {item.children.map(child => (
                                                <p
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        router.push(child.path);
                                                    }}
                                                    key={child.label}
                                                    className="bg-red-600 py-1 px-2 rounded-lg text-white text-sm cursor-pointer hover:bg-red-700"
                                                >
                                                    {child.label}
                                                </p>
                                            ))}
                                        </div>
                                    }

                                </div>
                                <p>{item.description}</p>
                            </div>
                        </Link>
                    )
                ))}
            </div>
        </div>
    )
}

export default Home