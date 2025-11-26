"use client";

import { useEffect, useState } from "react";

type ProductionData = {
    id: number;
    brand: string;
    model: string;
    seria_N: string;
    category: string;
    note: string;
    userId: string;
};

export default function ManageProduction() {
    const [production, setProduction] = useState<ProductionData[]>([]);
    const [reload, setReload] = useState(false);
    const [selectedProduction, setSelectedProduction] = useState<number | null>(null);
    const [brand, setBrand] = useState("")
    const [model, setModel] = useState("")
    const [seria_N, setSeria_N] = useState("")
    const [category, setCategory] = useState("")
    const [userId, setUserId] = useState("")

    const handleProduction = async () => {
        const res = await fetch("/api/production");
        if (!res.ok) {
            console.error("Error fetching brands:", await res.text());
            return;
        }
        const data: ProductionData[] = await res.json();

        setProduction(data);
    };

    useEffect(() => {
        handleProduction();
    }, [reload])

    const refreshModels = () => setReload((prev) => !prev);

    const handleEdit = (production: ProductionData) => {
        setSelectedProduction(production.id);
        setBrand(production.brand);
        setModel(production.model);
        setSeria_N(production.seria_N);
        setCategory(production.category);
        setUserId(production.userId);
    };

    const handleDelete = async (production: ProductionData) => {
        const confirmDelete = confirm(`Are you sure you want to delete ${production.brand} ${production.model} ${production.seria_N}?`);
        if (!confirmDelete) return;

        try {
            const res = await fetch(`/api/production/${production.id}`, {
                method: "DELETE",
                credentials: "include",
            });

            const data = await res.json();

            if (!res.ok) {
                alert(`Error: ${data.error}`);
                return;
            }

            alert(`Brand ${production.brand}, Model ${production.model} and SN ${production.seria_N} deleted successfully!`);
            // UI update...
            refreshModels();

            // Clean the form if you were editing the deleted user
            setBrand("")
            setModel("")
            setSeria_N("")
            setCategory("")
            setUserId("")
        } catch (error) {
            console.error("Delete error:", error);
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // UPDATE mode
            if (!selectedProduction) {
                alert("Select a production record to update");
                return;
            }

            const updateData = {
                id: selectedProduction,
                brand,
                model,
                seria_N: seria_N,
                category,
                userId
            };

            const res = await fetch(`/api/production/${selectedProduction}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updateData),
            });

            if (!res.ok) {
                const error = await res.text();
                alert(`Error updating production record: ${error}`);
                return;
            }

            alert("Production record updated successfully!");
            refreshModels();
            setBrand("");
            setModel("");
            setSeria_N("");
            setCategory("");
            setUserId("");
            setSelectedProduction(null);

        } catch (error) {
            console.error("Submit error:", error);
            alert("An unexpected error occurred.");
        }
    };

    return (
        <div className="flex flex-col justify-center items-center gap-8 my-[4%] w-screen">
            <h1 className="text-4xl font-bold py-4">Management Production Record </h1>
            <div className="flex justify-center w-screen">
                <form
                    className="flex flex-col gap-6"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex justify-between sm:justify-normal gap-2 items-center">
                                <p className="text-2xl">Brand:</p>
                                <input
                                    type="text"
                                    className="border-2 border-slate-100/50 rounded p-2"
                                    name="brand"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    placeholder="Brand"
                                />
                            </div>

                            <div className="flex justify-between sm:justify-normal gap-2 items-center">
                                <p className="text-2xl">Model:</p>
                                <input
                                    type="text"
                                    className="border-2 border-slate-100/50 rounded p-2"
                                    name="model"
                                    value={model}
                                    onChange={(e) => setModel(e.target.value)}
                                    placeholder="Model"
                                />
                            </div>

                            <div className="flex justify-between sm:justify-normal gap-2 items-center">
                                <p className="text-2xl">Serial N:</p>
                                <input
                                    type="text"
                                    className="border-2 border-slate-100/50 rounded p-2"
                                    name="seria_N"
                                    value={seria_N}
                                    onChange={(e) => setSeria_N(e.target.value)}
                                    placeholder="Serial number"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <div className="flex justify-between sm:justify-normal gap-2 items-center">
                                <p className="text-2xl">Category:</p>
                                <input
                                    type="text"
                                    className="border-2 border-slate-100/50 bg-gray-500/20 rounded p-2"
                                    name="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    placeholder="Category"
                                    readOnly
                                />
                            </div>

                            <div className="flex justify-between sm:justify-normal gap-2 items-center">
                                <p className="text-2xl">UserId:</p>
                                <input
                                    type="text"
                                    className="border-2 border-slate-100/50 bg-gray-500/20 rounded p-2"
                                    name="userId"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    placeholder="UserId"
                                    readOnly
                                />
                            </div>

                            <div className="text-end">
                                <button
                                    className="border-2 border-slate-100/50 rounded p-2 w-[84px] bg-red-500 font-bold cursor-pointer"
                                    type="submit"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div className="flex gap-8 w-[90%] md:w-[65%] pb-12 max-h-[600px] overflow-y-auto">
                {/* Models Table */}
                <table className="w-full border border-gray-300 border-collapse">
                    <thead className="sticky top-0 z-20 bg-black text-white w-full text-2xl">
                        <tr>
                            <th className="p-2">Brand</th>
                            <th className="p-2">Model</th>
                            <th className="p-2">Serial N</th>
                            <th className="p-2">Category</th>
                            <th className="p-2">Note</th>
                            <th className="p-2">user Id</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {production
                            .sort((a, b) => b.id - a.id)
                            .map((prod) => (
                                <tr key={prod.id} className="odd:bg-gray-100/5">
                                    <td className="p-2 text-center">{prod.brand}</td>
                                    <td className="p-2 text-center">{prod.model}</td>
                                    <td className="p-2 text-center">{prod.seria_N}</td>
                                    <td className="p-2 text-center">{prod.category}</td>
                                    <td className="p-2 text-center">{prod.note}</td>
                                    <td className="p-2 text-center">{prod.userId}</td>
                                    <td className="flex justify-center items-center gap-8 p-2">
                                        <button
                                            className="bg-green-600 px-3 py-1 rounded text-white font-bold"
                                            onClick={() => handleEdit(prod)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-600 px-3 py-1 rounded text-white font-bold"
                                            onClick={() => handleDelete(prod)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )).slice(0, 50)}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
