'use client';
import { useState } from "react";
import { useUser } from "@/context/userContext";

function requireLabels() {
  const [clickStatus, setClickStatus] = useState<string>("Sent");
  const { user } = useUser();


  const handleLabelList = (status: string) => {
    setClickStatus(status);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const newLabelData = {
      brand: form.brand.value,
      model: form.model.value,
      serialN: form.serialN.value,
      upc: form.upc.value,
      id: user ? user.id : null,
      qty: form.qty.value,
    };

    // console.log(newLabelData);
    
    try {
      const res = await fetch("/api/production", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          brand: newLabelData.brand,
          model: newLabelData.model,
          seria_N: newLabelData.serialN,
          upc: newLabelData.upc,
          id: newLabelData.id,
          qty: newLabelData.qty,
        }),
      });

      if (!res.ok) {
        throw new Error(`Label with error: ${res.status}`);
      }

      form.reset();
      alert("Label created successful");
    } catch (error) {
      console.error("Something is wrong meanwhile send the form:", error);
      alert("There is a problem to register. Try it again.");
    }
  }

  return (
    <div>
      <h1 className="flex justify-center text-5xl font-bold mt-[4%]">Report New Labels</h1>

      <div className="flex justify-center items-center mt-[5.5%] gap-4">
        {/* Form to input new label details */}
        <form
          className="border-2 border-white rounded p-8 flex flex-col gap-4 min-h-[550px]"
          onSubmit={handleSubmit}
        >
          <h3 className="font-bold text-2xl">Enter New Labels Details</h3>
          <div className="flex flex-col gap-3">
            <label htmlFor="brand">Brand:</label>
            <input
              type="text"
              id="brand"
              placeholder="Enter brand name"
              className="border-2 border-slate-100/50 rounded p-2"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="model">Model:</label>
            <input
              type="text"
              id="model"
              placeholder="Enter model number"
              className="border-2 border-slate-100/50 rounded p-2"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="serialN">Serial Number:</label>
            <input
              type="text"
              id="serialN"
              placeholder="Enter serial number"
              className="border-2 border-slate-100/50 rounded p-2"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="upc">UPC:</label>
            <input
              type="text"
              id="upc"
              placeholder="Enter 12-digit UPC"
              className="border-2 border-slate-100/50 rounded p-2"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="qty">Quantity:</label>
            <input
              type="text"
              id="qty"
              placeholder="Enter quantity"
              className="border-2 border-slate-100/50 rounded p-2"
            />
          </div>

          <div className="flex justify-end pt-3">
            <button
              type="submit"
              className="border-2 border-slate-100/50 rounded p-2 w-[84px] bg-red-500 font-bold cursor-pointer"
            >
              Submit
            </button>
          </div>

        </form>

        {/* List of information sent */}
        <div className="border-2 border-white rounded p-8 flex flex-col gap-4 min-h-[550px]">
          <div className="flex gap-10">
            <button
              onClick={() => handleLabelList("Sent")}
              className={clickStatus === "Sent" ? "font-bold underline underline-offset-8 text-green-600 cursor-pointer" : "cursor-pointer"}
            >
              Sent (2)
            </button>
            <button
              onClick={() => handleLabelList("Rejected")}
              className={clickStatus === "Rejected" ? "font-bold underline underline-offset-8 text-green-600 cursor-pointer" : "cursor-pointer"}
            >
              Rejected
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th className="px-4 py-3 font-medium" scope="col">Brand</th>
                <th className="px-4 py-3 font-medium" scope="col">Model</th>
                <th className="px-4 py-3 font-medium" scope="col">Serial Number</th>
                <th className="ml-12 px-4 py-3 font-medium" scope="col">UPC</th>
                <th className="ml-12 px-4 py-3 font-medium" scope="col">Qty</th>
                <th className="ml-12 px-4 py-3 font-medium" scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100/50 hover:bg-gray-100/10">
                <td className="px-4 py-3">TechCore</td>
                <td className="px-4 py-3">X-Pro 5000</td>
                <td className="px-4 py-3">SN987654321</td>
                <td className="px-4 py-3">123456789012</td>
                <td className="px-4 py-3">2</td>
                <td className="px-4 py-3">Pending</td>
                {/* Printed is the other option*/}
              </tr>
            </tbody>
          </table>
        </div>

      </div>

    </div>
  )
}

export default requireLabels