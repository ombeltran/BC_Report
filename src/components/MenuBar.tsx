"use client";

import { FiLogOut } from "react-icons/fi";
import { HiOutlineDownload } from "react-icons/hi";
import { FaUserFriends } from "react-icons/fa";
import { TiHomeOutline } from "react-icons/ti";
import { TbReportSearch } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";
import Link from "next/link";
import React, { useState } from "react";

function MenuBar() {
    const router = useRouter();
    const { user, setUser } = useUser();

    const [isOpen, setIsOpen] = useState(false); // Menú hamburguesa móvil
    const [isUsersOpen, setIsUsersOpen] = useState(false); // Submenú Users en desktop
    const [isTransactionOpen, setIsTransactionOpen] = useState(false); // Submenú Users en desktop

    const handleLogout = async () => {
        setUser(null);
        await fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include",
        });
        router.replace("/");
    };

    return (
        <div className="bg-slate-800/25 border-b-4 border-slate-800/5 w-full shadow-[0_6px_12px_-6px_rgba(255,255,255,0.3)]">
            <div className="flex justify-between items-center py-2 px-4 sm:px-6 font-bold">
                {/* Logo / Home */}
                <Link href="/features/production">
                    <div className="flex gap-2 items-center">
                        <div className="bg-red-600 p-1 rounded-lg">
                            <TiHomeOutline />
                        </div>
                        <p>Home</p>
                    </div>
                </Link>

                {/* Botón hamburguesa solo en móvil */}
                <div className="sm:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-white focus:outline-none"
                    >
                        <div className="space-y-1">
                            <span className="block w-6 h-0.5 bg-white"></span>
                            <span className="block w-6 h-0.5 bg-white"></span>
                            <span className="block w-6 h-0.5 bg-white"></span>
                        </div>
                    </button>
                </div>

                {/* Menu desktop */}
                <ul className="hidden sm:flex flex-row gap-10 items-center relative">
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

                    {user?.role === "master" && (
                        <>
                            <li
                                className="flex items-center gap-2 cursor-pointer hover:text-slate-200 transition"
                                onClick={() => window.open("/api/export", "_blank")}
                            >
                                <div className="bg-red-600 p-1 rounded-lg">
                                    <HiOutlineDownload />
                                </div>
                                Download
                            </li>

                            {/* Submenú Users */}
                            <li className="relative">
                                <div
                                    className="flex items-center gap-2 cursor-pointer hover:text-slate-200 transition"
                                    onClick={() => setIsUsersOpen(!isUsersOpen)}
                                >
                                    <div className="bg-red-600 p-1 rounded-lg">
                                        <FaUserFriends />
                                    </div>
                                    Users
                                </div>

                                {isUsersOpen && (
                                    <ul className="absolute top-full left-0 bg-slate-800 text-white rounded mt-1 min-w-[150px] shadow-lg z-50">
                                        <Link href="/features/production/createUsers">
                                            <li className="px-4 py-2 hover:bg-slate-700 cursor-pointer">
                                                Create users
                                            </li>
                                        </Link>
                                        <Link href="/features/production/editDeleteUsers">
                                            <li className="px-4 py-2 hover:bg-slate-700 cursor-pointer">
                                                Modify users
                                            </li>
                                        </Link>
                                    </ul>
                                )}
                            </li>

                            {/* Submenú Transactions */}
                            <li className="relative">
                                <div
                                    className="flex items-center gap-2 cursor-pointer hover:text-slate-200 transition"
                                    onClick={() => setIsTransactionOpen(!isTransactionOpen)}
                                >
                                    <div className="bg-red-600 p-1 rounded-lg">
                                        <TbReportSearch />
                                    </div>
                                    Transactions
                                </div>

                                {isTransactionOpen && (
                                    <ul className="absolute top-full left-0 bg-slate-800 text-white rounded mt-1 min-w-[150px] shadow-lg z-50">
                                        <Link href="/features/production/createModels">
                                            <li className="px-4 py-2 hover:bg-slate-700 cursor-pointer">
                                                Models
                                            </li>
                                        </Link>

                                        <Link href="/features/production/createBrands">
                                            <li className="px-4 py-2 hover:bg-slate-700 cursor-pointer">
                                                Brands
                                            </li>
                                        </Link>

                                        <Link href="/features/production/manageProduction">
                                            <li className="px-4 py-2 hover:bg-slate-700 cursor-pointer">
                                                Production
                                            </li>
                                        </Link>
                                    </ul>
                                )}
                            </li>
                        </>
                    )}
                </ul>
            </div>

            {/* Menu móvil desplegable */}
            <div
                className={`
                    sm:hidden overflow-hidden transition-all duration-300 ease-in-out
                    ${isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
            >
                <ul className="flex flex-col gap-4 px-4 pb-4 text-white pt-4">
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

                    {user?.role === "master" && (
                        <>
                            <li
                                className="flex items-center gap-2 cursor-pointer hover:text-slate-200 transition"
                                onClick={() => window.open("/api/export", "_blank")}
                            >
                                <div
                                    className="bg-red-600 p-1 rounded-lg"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <HiOutlineDownload />
                                </div>
                                Download
                            </li>

                            {/* Users */}
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-2">
                                    <div className="bg-red-600 p-1 rounded-lg">
                                        <FaUserFriends />
                                    </div>
                                    <p className="text-white font-bold">Users</p>
                                </div>

                                <Link href="/features/production/createUsers">
                                    <li
                                        className="px-4 py-2 hover:bg-slate-700 cursor-pointer"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Create users
                                    </li>
                                </Link>

                                <Link href="/features/production/editDeleteUsers">
                                    <li
                                        className="px-4 py-2 hover:bg-slate-700 cursor-pointer"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Modify users
                                    </li>
                                </Link>
                            </div>

                            {/* Transactions */}
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-2">
                                    <div className="bg-red-600 p-1 rounded-lg">
                                        <TbReportSearch />
                                    </div>
                                    <p className="text-white font-bold">Transactions</p>
                                </div>

                                <Link href="/features/production/createModels">
                                    <li
                                        className="px-4 py-2 hover:bg-slate-700 cursor-pointer"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Models
                                    </li>
                                </Link>

                                <Link href="/features/production/createBrands">
                                    <li
                                        className="px-4 py-2 hover:bg-slate-700 cursor-pointer"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Brands
                                    </li>
                                </Link>

                                <Link href="/features/production/manageProduction">
                                    <li
                                        className="px-4 py-2 hover:bg-slate-700 cursor-pointer"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Production
                                    </li>
                                </Link>
                            </div>
                        </>
                    )}
                </ul>
            </div>

        </div>
    );
}

export default MenuBar;
