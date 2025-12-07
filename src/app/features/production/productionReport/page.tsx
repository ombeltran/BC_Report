"use client"
import { useUser } from "@/context/userContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function ProductionPage() {

    interface Brand { id: number; name: string; }
    interface Model { id: number; name: string; brandId: number; }
    interface Category { id: number; name: string; }

    const [brands, setBrands] = useState<Brand[]>([]);
    const [models, setModels] = useState<Model[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedBrand, setSelectedBrand] = useState<string>("");
    const [checkedUser, setCheckedUser] = useState(false);
    const [alertForm, setAlertForm] = useState<string>("")
    const { user } = useUser();
    const router = useRouter();

    //Allow match models and brand
    const filteredModels = models.filter(
        (model) =>
            brands.find((b) => b.name === selectedBrand)?.id === model.brandId
    );

    // Fetch brands from API
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const res = await fetch("/api/brands", {
                    method: "GET",
                });
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                setBrands(data);
                // console.log("Brands:", data);
            } catch (error) {
                console.error("Error fetching brands:", error);
            }
        }
        fetchBrands();
    }, []);

    // Fetch categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("/api/categories", {
                    method: "GET",
                });
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                setCategories(data);
                // console.log("Categories:", data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }
        fetchCategories();
    }, []);

    // Fetch models from API
    useEffect(() => {
        const fetchModels = async () => {
            try {
                const res = await fetch("/api/models", {
                    method: "GET",
                });
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                setModels(data);
                // console.log("Models:", data);
            } catch (error) {
                console.error("Error fetching models:", error);
            }
        }
        fetchModels();
    }, []);

    useEffect(() => {
        if (!checkedUser && user !== undefined) {
            setCheckedUser(true);

            if (user === null) {
                alert(
                    "Something went wrong, please login again. If the problem persists, contact the administrator."
                );
                router.push("/");
            }
        }
    }, [user, checkedUser, router]);

    type FormData = {
        brand: string;
        model: string;
        seria_N: string;
        category: string;
        note: string;
        user: string | null;
    }

    // This useEffect handles the alert form visibility into teh form when de user no fill some form field
    useEffect(() => {
        if (alertForm) {
            const timer = setTimeout(() => {
                setAlertForm("");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [alertForm]);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;

        //Process that ensure the brand, model, and category are selected from the list
        const brandValue = form.brand.value.trim();
        const modelValue = form.model.value.trim();
        const categoryValue = form.category.value.trim();

        const validBrand = brands.some(b => b.name === brandValue);
        const validModel = filteredModels.some(m => m.name === modelValue);
        const validCategory = categories.some(c => c.name === categoryValue);

        if (!validBrand) {
            setAlertForm("The brand must be selected from the list.");
            return;
        }

        if (!validModel) {
            setAlertForm("The model must be selected from the list.");
            return;
        }

        if (!validCategory) {
            setAlertForm("The category must be selected from the list.");
            return;
        }

        const data: FormData = {
            brand: form.brand.value,
            model: form.model.value,
            seria_N: form.seria_N.value.toUpperCase(),
            category: form.category.value,
            note: form.note.value,
            user: user ? user.name.toString() : null,
        };

        // Validate if the form fields are filled
        if (!data.brand) {
            setAlertForm("Please the brand field is required");
            return;
        }
        if (!data.model) {
            setAlertForm("Please the model field is required");
            return;
        }
        if (!data.seria_N) {
            setAlertForm("Please the serial number field is required");
            return;
        }
        if (!data.category) {
            setAlertForm("Please the field category is required");
            return;
        }

        try {
            const res = await fetch("/api/production", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    brand: data.brand,
                    model: data.model,
                    seria_N: data.seria_N,
                    category: data.category,
                    note: data.note,
                    userId: user?.id,
                }),
            });

            if (!res.ok) {
                throw new Error(`Register with error: ${res.status}`);
            }

            form.reset();
            setSelectedBrand("");
            alert("register created successful");
        } catch (error) {
            console.error("Something is wrong meanwhile send the form:", error);
            alert("There is a problem to register. Try it again.");
        }
    };

    return (
        <div className="flex flex-col justify-center items-center w-screen">
            <h1 className="p-4 text-4xl font-bold sm:mt-12 mt-7 mb-6 text-center">Productivity Record</h1>
            <div className="flex flex-col justify-center items-center">
                <form
                    className="flex flex-col gap-3 px-4 border-2 p-8 border-white rounded sm:min-w-[600px] mb-6"
                    action=""
                    onSubmit={handleSubmit}>

                    {/* Brand section */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:justify-between justify-center sm:ml-0 ml-2">
                        <h3 className="text-2xl ">Brand:</h3>
                        <datalist id="brands" >
                            {
                                brands.map((brand) => (
                                    <option key={brand.id} value={brand.name as string} className="text-black">{brand.name}</option>
                                ))
                            }
                        </datalist>
                        <input
                            className="border-2 border-slate-100/50 rounded p-2 sm:min-w-[334px] w-[250px]"
                            list="brands"
                            name="brand"
                            placeholder="Select or type a brand"
                            value={selectedBrand} 
                            onChange={(e) => setSelectedBrand(e.target.value)}
                        />
                    </div>

                    {/* Model section */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:justify-between justify-center sm:ml-0 ml-2">
                        <h3 className="text-2xl ">Model:</h3>
                        <datalist id="models" >
                            {
                                filteredModels.map((model) => (
                                    <option key={model.id} value={model.name as string} className="text-black">{model.name}</option>
                                ))
                            }
                        </datalist>
                        <input
                            className="border-2 border-slate-100/50 rounded p-2 sm:min-w-[334px] w-[250px]"
                            list="models"
                            id="model"
                            name="model"
                            placeholder="Select or type a model"
                        />
                    </div>

                    {/* Category */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:justify-between justify-center sm:ml-0 ml-2">
                        <h3 className="text-2xl ">Category:</h3>
                        <datalist id="categories" >
                            {
                                categories.map((category) => (
                                    <option key={category.id} value={category.name as string} className="text-black">{category.name}</option>
                                ))
                            }
                        </datalist>
                        <input
                            className="border-2 border-slate-100/50 rounded p-2 sm:min-w-[334px] w-[250px]"
                            list="categories"
                            name="category"
                            placeholder="Select or type a category"
                        />
                    </div>

                    {/* Note */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:justify-between justify-center sm:ml-0 ml-2">
                        <h3 className="text-2xl ">Note:</h3>
                        <textarea
                            className="border-2 border-slate-100/50 rounded p-2 sm:min-w-[334px] w-[250px] min-h-[70px]"
                            name="note"
                            id="note"
                            placeholder="Report note here"
                        />
                    </div>

                    {/* Serial number */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:justify-between justify-center sm:ml-0 ml-2">
                        <h3 className="text-2xl ">Serial number:</h3>
                        <input
                            className="border-2 border-slate-100/50 rounded p-2 sm:min-w-[334px] w-[250px]"
                            type="text"
                            name="seria_N"
                            placeholder="Report serial number here"
                        />
                    </div>

                    {/* User */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:justify-between justify-center sm:ml-0 ml-2">
                        <h3 className="text-2xl ">User:</h3>
                        <div
                            className="border-2 border-slate-100/50 rounded p-2 sm:min-w-[334px] w-[250px]"
                        >
                            {user && user.name}
                        </div>

                    </div>

                    {alertForm && (
                        <div className="text-red-500 font-bold mb-4">
                            {alertForm}
                        </div>
                    )}

                    <div className="sm:ml-0 ml-2 mt-2 text-end">
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

export default ProductionPage