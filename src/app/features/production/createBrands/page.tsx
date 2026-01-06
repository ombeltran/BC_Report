"use client";

import { useEffect, useState } from "react";

type BrandData = {
  id: number;
  name: string;
};

export default function CreateModels() {
  const [brands, setBrands] = useState<BrandData[]>([]);
  const [reload, setReload] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
  const [brandName, setBrandName] = useState("")
  const [checked, setChecked] = useState(false);

  const handleBrands = async () => {
    const res = await fetch("/api/brands");
    if (!res.ok) {
      console.error("Error fetching brands:", await res.text());
      return;
    }
    const data: BrandData[] = await res.json();
    setBrands(data);
  };

  useEffect(() => {
    handleBrands();
  }, [reload])

  const refreshModels = () => setReload((prev) => !prev);

  const handleEdit = (brand: BrandData) => {
    setSelectedBrand(brand.id);
    setBrandName(brand.name);
  };

  const handleDelete = async (brand: BrandData) => {
    const confirmDelete = confirm(`Are you sure you want to delete ${brand.name}?`);
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/brands/${brand.id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(`Error: ${data.error}`);
        return;
      }

      alert(`Brand ${brand.name} deleted successfully!`);
      // UI update...
      refreshModels();

      // Clean the form if you were editing the deleted user
      setBrandName("")
    } catch (error) {
      console.error("Delete error:", error);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (checked) {
        // CREATE brand
        const newBrand = {
          name: brandName,
        };

        const res = await fetch("/api/brands", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newBrand),
        });

        if (!res.ok) {
          const error = await res.text();
          alert(`Error creating brand: ${error}`);
          return;
        }

        alert("Brand created successfully!");
        refreshModels();
        setBrandName("");
        setChecked(false);
      } else {
        // UPDATE mode
        if (!selectedBrand) {
          alert("Select a model to update");
          return;
        }

        const updateData = {
          id: selectedBrand,
          name: brandName,
        };

        const res = await fetch(`/api/brands/${selectedBrand}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData),
        });

        if (!res.ok) {
          const error = await res.text();
          alert(`Error updating brand: ${error}`);
          return;
        }

        alert("Brand updated successfully!");
        refreshModels();
        setBrandName("");
        setSelectedBrand(null);
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-8 my-[4%] w-screen">
      <h1 className="text-4xl font-bold py-4">Management Brand </h1>
      <div>
        <form
          className="flex flex-col gap-6"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex justify-between sm:justify-normal gap-2 items-center">
              <p className="text-2xl">Brand name:</p>
              <input
                type="text"
                className="border-2 border-slate-100/50 rounded p-2"
                name="brandModel"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="Brand name"
              />
            </div>

            <div className="text-end">
              {
                checked ? (
                  <button
                    className="border-2 border-slate-100/50 rounded p-2 w-[84px] bg-red-500 font-bold cursor-pointer"
                    type="submit"
                  >
                    Create
                  </button>
                ) : (
                  <button
                    className="border-2 border-slate-100/50 rounded p-2 w-[84px] bg-red-500 font-bold cursor-pointer"
                    type="submit"
                  >
                    Save
                  </button>
                )
              }
            </div>
            <div className="text-center">
              <label className="noInclude flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                  onClick={() => {
                    setBrandName("")
                  }}
                />
                Create a new item
              </label>
              <p>{checked ? "Checked!" : "Not checked"}</p>
            </div>
          </div>
        </form>
      </div>

      <div className="flex gap-8 w-[90%] md:w-[25%] pb-12 max-h-[600px] overflow-y-auto">
        {/* Models Table */}
        <table className="w-full border border-gray-300 border-collapse ">
          <thead className="sticky top-0 text-white bg-black w-full text-2xl">
            <tr>
              <th className="p-2">Brand name</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand) => (
              <tr key={brand.id} className="odd:bg-gray-100/5">
                <td className="p-2 text-center">{brand.name}</td>
                <td className="flex justify-center items-center gap-8 p-2">
                  <button
                    className="bg-green-600 px-3 py-1 rounded text-white font-bold"
                    onClick={() => handleEdit(brand)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 px-3 py-1 rounded text-white font-bold"
                    onClick={() => handleDelete(brand)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
