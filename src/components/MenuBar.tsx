"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser } from "@/context/userContext";
import { getMenuForRole } from "@/libs/getMenuForRole";
import { MenuItem } from "@/config/menu";
import { useRouter } from "next/navigation";

export default function MenuBar() {
    const { setUser, user } = useUser();
    const router = useRouter();
    const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    if (!user) return null;

    const menuItems: MenuItem[] = getMenuForRole(user.role);

    const toggleSubmenu = (label: string) => {
        setOpenSubmenus(prev => ({ ...prev, [label]: !prev[label] }));
    };

    const handleLogout = async () => {
        setUser(null);
        await fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include",
        });
        router.replace("/");
    };

    return (
        <nav className="fixed top-0 left-0 z-20 bg-slate-800 w-full border-b-4 border-slate-800/5 shadow-[0_6px_12px_-6px_rgba(255,255,255,0.3)]">
            <div className="max-w-7xl mx-auto flex items-center justify-between h-14 px-4 sm:px-6">
                {/* Home a la izquierda */}
                <div className="flex items-center gap-2">
                    <Link href={menuItems[0]?.path} className=" flex gap-3 font-bold">
                        <div className="bg-red-600 p-1 rounded-2xl text-xl">
                            {menuItems[0]?.icon && (() => {
                                const HomeIcon = menuItems[0].icon;
                                return <HomeIcon />;
                            })()}
                        </div>
                        {menuItems[0]?.label || "Home"}
                    </Link>
                </div>


                {/* Menú desktop */}
                <div className="flex gap-7">
                    <ul className="hidden sm:flex gap-6 items-center font-bold">
                        {menuItems.slice(1).map(item => (
                            <li key={item.label} className="relative">
                                {item.label === "Logout" ? (
                                    <div
                                        className="flex items-center gap-2 cursor-pointer hover:text-slate-200 transition"
                                        onClick={handleLogout}
                                    >
                                        <div className="bg-red-600 p-1 rounded-2xl text-xl">
                                            {item.icon && <item.icon />}
                                        </div>
                                        {item.label}
                                    </div>
                                ) : (
                                    <div
                                        className="flex items-center gap-2 cursor-pointer hover:text-slate-200 transition"
                                        onClick={() => item.children && toggleSubmenu(item.label)}
                                    >
                                        <div className="bg-red-600 p-1 rounded-2xl text-xl">
                                            {item.icon && <item.icon />}
                                        </div>
                                        <Link href={item.path}>{item.label}</Link>
                                    </div>
                                )}

                                {item.children && openSubmenus[item.label] && (
                                    <ul className="absolute top-full left-0 bg-slate-800 text-white rounded mt-1 min-w-[150px] shadow-lg z-30">
                                        {item.children.map(child => (
                                            <Link key={child.label} href={child.path} onClick={() => {
                                                // Contraer el submenu al hacer click
                                                setOpenSubmenus(prev => ({ ...prev, [item.label]: false }));
                                            }}>
                                                <li className="z-50 px-4 py-2 hover:bg-slate-700 cursor-pointer">
                                                    {child.label}
                                                </li>
                                            </Link>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                    <div className="text-[18px] font-semibold bg-blue-400 rounded-3xl p-2">
                        {user.name.charAt(0).toUpperCase()}
                        {user.lastName.charAt(0).toUpperCase()}
                    </div>
                </div>

                {/* Botón hamburguesa móvil */}
                <div className="sm:hidden">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="flex flex-col gap-1 w-6 h-6 justify-center"
                    >
                        <span className="block h-0.5 w-full bg-white"></span>
                        <span className="block h-0.5 w-full bg-white"></span>
                        <span className="block h-0.5 w-full bg-white"></span>
                    </button>
                </div>
            </div>

            {/* Menú móvil */}
            {mobileMenuOpen && (
                <ul className="sm:hidden flex flex-col gap-2 bg-slate-800 text-white px-4 pb-4 pt-2">
                    {menuItems.slice(1).map(item => (
                        <li key={item.label} className="relative">
                            {item.children ? (
                                <>
                                    <div
                                        className="flex justify-between items-center cursor-pointer py-1"
                                        onClick={() => toggleSubmenu(item.label)}
                                    >
                                        <div className="flex gap-3 font-bold">
                                            <p className="bg-red-600 p-1 rounded-2xl">
                                                {item.icon && <item.icon />}
                                            </p>
                                            <span>{item.label}</span>
                                        </div>
                                        <span>{openSubmenus[item.label] ? "▲" : "▼"}</span>
                                    </div>
                                    {openSubmenus[item.label] && (
                                        <ul className="pl-4 flex flex-col gap-1">
                                            {item.children.map(child => (
                                                <li key={child.label} className="py-1 font-bold">
                                                    <Link href={child.path} onClick={() => setMobileMenuOpen(false)}>
                                                        {child.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </>
                            ) : (
                                // Items sin children: acción directa
                                <div
                                    className="flex gap-3 items-center  py-1 cursor-pointer font-bold"
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        if (item.label === "Logout") {
                                            handleLogout(); // llama la función directamente
                                        } else {
                                            router.push(item.path); // navega si es un enlace normal
                                        }
                                    }}
                                >
                                    <p className="bg-red-600 p-1 rounded-2xl">
                                        {item.icon && <item.icon />}
                                    </p>
                                    {item.label}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
}
