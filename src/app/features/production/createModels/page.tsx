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

type Props = {
  models: ModelData[];
};


export default function CreateModels() {
  const [brands, setBrands] = useState<BrandData[]>([]);
  const [models, setModels] = useState<ModelData[]>([]);
  const [reload, setReload] = useState(false);
  const [selectedModel, setSelectedModel] = useState<ModelData | null>(null);
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
    setSelectedModel(model);
    setModelName(model.name);
    setModelBrandId(model.brandId);
  };


  return (
    <div className="flex flex-col justify-center items-center gap-8 my-[4%] w-screen">
      <h1 className="text-4xl font-bold py-4">Management Model </h1>
      <div>
        <form
          className="flex flex-col gap-6"
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
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
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
            {models.map((models) => (
              <tr key={models.id} className="odd:bg-gray-100/5">
                <td className="p-2 text-center">{models.name}</td>
                <td className="p-2 text-center">{models.brandId}</td>
                <td className="flex justify-center items-center gap-4 p-2">
                  <button
                    className="bg-green-600 px-3 py-1 rounded text-white font-bold"
                    onClick={() => handleEdit(models)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 px-3 py-1 rounded text-white font-bold"
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
