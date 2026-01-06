"use client";

import { useEffect, useState } from "react";

type BrandData = {
  id: number;
  name: string;
};

type ModelData = {
  id: number;
  name: string;
  brandId: number;
};

export default function CreateModels() {
  const [brands, setBrands] = useState<BrandData[]>([]);
  const [models, setModels] = useState<ModelData[]>([]);
  const [reload, setReload] = useState(false);
  const [selectedModel, setSelectedModel] = useState<number | null>(null);
  const [modelName, setModelName] = useState("")
  const [modelBrandId, setModelBrandId] = useState<number | "">("")
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

  const handleModels = async () => {
    const res = await fetch("/api/models");
    if (!res.ok) {
      console.error("Error fetching models:", await res.text());
      return;
    }
    const data: ModelData[] = await res.json();
    // Sort desc and show 10 items
    const top10Models = data.sort((a, b) => b.id - a.id).slice(0, 10);
    setModels(top10Models);
  }

  useEffect(() => {
    handleBrands();
    handleModels();
  }, [reload])

  const refreshModels = () => setReload((prev) => !prev);

  const handleEdit = (model: ModelData) => {
    setSelectedModel(model.id);
    setModelName(model.name);
    setModelBrandId(model.brandId);
  };

  const handleDelete = async (model: ModelData) => {
    const confirmDelete = confirm(`Are you sure you want to delete ${model.name}?`);
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/models/${model.id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(`Error: ${data.error}`);
        return;
      }

      alert(`Model ${model.name} deleted successfully!`);
      // UI update...
      refreshModels();

      // Clean the form if you were editing the deleted user
      setModelName("")
      setModelBrandId("")
    } catch (error) {
      console.error("Delete error:", error);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (checked) {
        // CREATE mode
        const newModel = {
          name: modelName,
          brandId: modelBrandId,
        };

        const res = await fetch("/api/models", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newModel),
        });

        if (!res.ok) {
          const error = await res.text();
          alert(`Error creating model: ${error}`);
          return;
        }

        alert("Model created successfully!");
        refreshModels();
        setModelName("");
        setModelBrandId("");
        setChecked(false);
      } else {
        // UPDATE mode
        if (!selectedModel) {
          alert("Select a model to update");
          return;
        }

        const updateData = {
          id: selectedModel,
          name: modelName,
          brandId: modelBrandId,
        };

        const res = await fetch(`/api/models/${selectedModel}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData),
        });

        if (!res.ok) {
          const error = await res.text();
          alert(`Error updating model: ${error}`);
          return;
        }

        alert("Model updated successfully!");
        refreshModels();
        setModelName("");
        setModelBrandId("");
        setSelectedModel(null);
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-8 my-[4%] w-screen">
      <h1 className="text-4xl font-bold py-4">Management Model </h1>
      <div>
        <form
          className="flex flex-col gap-6"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex justify-between sm:justify-normal gap-2 items-center">
              <p className="text-2xl">Model name:</p>
              <input
                type="text"
                className="border-2 border-slate-100/50 rounded p-2"
                name="modelNmae"
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                placeholder="Model name"
              />
            </div>

            <div className="flex justify-between sm:justify-normal gap-2 items-center">
              <p className="text-2xl">Brand code:</p>
              <input
                type="text"
                className="border-2 border-slate-100/50 rounded p-2"
                name="brandCode"
                value={modelBrandId === "" ? "" : modelBrandId}
                onChange={(e) => {
                  const value = e.target.value;
                  setModelBrandId(value === "" ? "" : Number(value));
                }}
                placeholder="Brand code"
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
                    setModelName("")
                    setModelBrandId("")
                  }}
                />
                Create a new item
              </label>
              <p>{checked ? "Checked!" : "Not checked"}</p>
            </div>
          </div>
        </form>
      </div>

      <div className="flex gap-8 w-[90%] md:w-[40%] pb-12 max-h-[600px] overflow-y-auto">
        {/* Models Table */}
        <table className="w-full border border-gray-300 border-collapse ">
          <thead className="sticky top-0 text-white bg-black w-full">
            <tr>
              <th className="p-2">Model name</th>
              <th className="p-2">Brand code</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {models.map((model) => (
              <tr key={model.id} className="odd:bg-gray-100/5">
                <td className="p-2 text-center">{model.name}</td>
                <td className="p-2 text-center">{model.brandId}</td>
                <td className="flex justify-center items-center gap-4 p-2">
                  <button
                    className="bg-green-600 px-3 py-1 rounded text-white font-bold"
                    onClick={() => handleEdit(model)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 px-3 py-1 rounded text-white font-bold"
                    onClick={() => handleDelete(model)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Brands Table */}
        <table className="w-full border border-gray-300 border-collapse">
          <thead className="sticky top-0 bg-black text-white">
            <tr>
              <th className="p-2">Brand code</th>
              <th className="p-2">Brand name</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand) => (
              <tr key={brand.id} className="odd:bg-gray-100/5">
                <td className="p-2 text-center">{brand.id}</td>
                <td className="p-2 text-center">{brand.name}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
