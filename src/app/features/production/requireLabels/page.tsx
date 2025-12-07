'use client';
import { useState, useEffect } from "react";
import { useUser } from "@/context/userContext";

function requireLabels() {
  interface Brand { id: number; name: string; }
  interface Model { id: number; name: string; brandId: number; }
  interface Label {
    id: number;
    brand: string;
    model: string;
    seria_N: string;
    upc: string;
    qty: number;
    userId: number;
    complete: boolean;
    rejected: boolean;
    submittedAt: string;
  }

  const [clickStatus, setClickStatus] = useState<string>("Sent");
  const { user } = useUser();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [labels, setLabels] = useState<Label[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [alertForm, setAlertForm] = useState<string>("");

  // This useEffect handles the alert form visibility into teh form when de user no fill some form field
  useEffect(() => {
    if (alertForm) {
      const timer = setTimeout(() => {
        setAlertForm("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [alertForm]);

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

  const fetchLabels = async () => {
    try {
      const res = await fetch("/api/labels", {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setLabels(data);
    } catch (error) {
      console.error("Error fetching labels:", error);
    }
  }
  useEffect(() => {
    fetchLabels();
  }, [])


  const handleLabelList = (status: string) => {
    setClickStatus(status);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    //Process that ensure the brand, model, and category are selected from the list
    const brandValue = form.brand.value.trim();
    const modelValue = form.model.value.trim();

    const validBrand = brands.some(b => b.name === brandValue);
    const validModel = filteredModels.some(m => m.name === modelValue);

    if (!validBrand) {
      setAlertForm("The brand must be selected from the list.");
      return;
    }

    if (!validModel) {
      setAlertForm("The model must be selected from the list.");
      return;
    }

    if(form.upc.value.length === 0){
      setAlertForm("The UPC field is required.");
      return;
    }

    if(form.qty.value.length === 0){
      setAlertForm("The Quantity field is required.");
      return;
    }

    const newLabelData = {
      brand: form.brand.value,
      model: form.model.value,
      serialN: form.serialN.value,
      upc: form.upc.value,
      userId: user ? user.id : null,
      qty: form.qty.value,
    };

    // console.log(newLabelData);

    try {
      const res = await fetch("/api/labels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          brand: newLabelData.brand,
          model: newLabelData.model,
          seria_N: newLabelData.serialN.toUpperCase(),
          upc: newLabelData.upc,
          userId: newLabelData.userId,
          qty: newLabelData.qty,
        }),
      });

      if (!res.ok) {
        throw new Error(`Label with error: ${res.status}`);
      }

      await fetchLabels();

      form.reset();
      setSelectedBrand("");
      alert("Label created successful");
    } catch (error) {
      console.error("Something is wrong meanwhile send the form:", error);
      alert("There is a problem to register. Try it again.");
    }
  }

  //This function count the pending and rejected labels for the user
  const pendingCount = labels.filter(
    l => l.userId === user?.id && l.complete === false && l.rejected === false
  ).length;

  const rejectedCount = labels.filter(
    l => l.userId === user?.id && l.rejected === true
  ).length;


  return (
    <div>
      <h1 className="flex justify-center text-5xl text-center font-bold mt-[4%]">Report New Labels</h1>

      <div className="flex sm:flex-row flex-col justify-center items-center mt-[5.5%] gap-4">
        {/* Form to input new label details */}
        <form
          className="border-2 border-white rounded p-8 flex flex-col gap-4 min-h-[550px]"
          onSubmit={handleSubmit}
        >
          <h3 className="font-bold text-2xl">Enter New Labels Details</h3>

          {/* Brand field */}
          <div className="flex flex-col gap-3">
            <label htmlFor="brand">Brand:</label>
            <datalist id="brands" >
              {
                brands.map((brand) => (
                  <option key={brand.id} value={brand.name as string} className="text-black">{brand.name}</option>
                ))
              }
            </datalist>
            <input
              className="border-2 border-slate-100/50 rounded p-2 "
              list="brands"
              id="brand"
              name="brand"
              placeholder="Select or type a brand"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            />
          </div>

          {/* Model field */}
          <div className="flex flex-col gap-3">
            <label htmlFor="model">Model:</label>
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

          {/* Serial Number field */}
          <div className="flex flex-col gap-3">
            <label htmlFor="serialN">Serial Number:</label>
            <input
              type="text"
              id="serialN"
              name="serialN"
              placeholder="Enter serial number"
              className="border-2 border-slate-100/50 rounded p-2"
            />
          </div>

          {/* UPC field */}
          <div className="flex flex-col gap-3">
            <label htmlFor="upc">UPC:</label>
            <input
              type="number"
              id="upc"
              name="upc"
              placeholder="Enter 12-digit UPC"
              className="border-2 border-slate-100/50 rounded p-2"
            />
          </div>

          {/* Quantity field */}
          <div className="flex flex-col gap-3">
            <label htmlFor="qty">Quantity:</label>
            <input
              type="number"
              id="qty"
              name="qty"
              placeholder="Enter quantity"
              className="border-2 border-slate-100/50 rounded p-2"
            />
          </div>

          {/* Button Submit */}
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
        <div className="border-2 border-white rounded p-4 flex flex-col gap-4 min-h-[550px] w-full max-w-[850px]">
          <div className="flex gap-10">
            <button
              onClick={() => handleLabelList("Sent")}
              className={clickStatus === "Sent" ? "font-bold underline underline-offset-8 text-green-600 cursor-pointer" : "cursor-pointer"}
            >
              Sent ({pendingCount})
            </button>
            <button
              onClick={() => handleLabelList("Rejected")}
              className={clickStatus === "Rejected" ? "font-bold underline underline-offset-8 text-green-600 cursor-pointer" : "cursor-pointer"}
            >
              Rejected ({rejectedCount})
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="text-xl">
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-sm sm:text-base font-medium" scope="col">Brand</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-sm sm:text-base font-medium" scope="col">Model</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-sm sm:text-base font-medium" scope="col">Serial Number</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-sm sm:text-base font-medium" scope="col">UPC</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-sm sm:text-base font-medium" scope="col">Qty</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-sm sm:text-base font-medium" scope="col">Status</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-sm sm:text-base font-medium" scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {labels
                  .filter(label => {
                    // Only user current
                    if (label.userId !== user?.id) return false;
                    // Filtrar by clickStatus
                    if (clickStatus === "Sent") {
                      // Show only pendings
                      return label.complete === false && label.rejected === false;
                    } else if (clickStatus === "Rejected") {
                      // Show only rejected
                      return label.rejected === true;
                    }

                    return false;
                  })
                  .slice(-10) // Show only last 10 records
                  .map(label => (
                    <tr key={label.id} className="border-b border-slate-100/50 hover:bg-gray-100/10">
                      <td className="px-4 py-3 text-left">{label.brand}</td>
                      <td className="px-4 py-3 text-left">{label.model}</td>
                      <td className="px-4 py-3 text-left">{label.seria_N}</td>
                      <td className="px-4 py-3 text-left">{label.upc}</td>
                      <td className="px-4 py-3 text-center">{label.qty}</td>
                      <td className="px-4 py-3 text-left">
                        {label.complete === false && label.rejected === false
                          ? "Pending"
                          : label.rejected === true
                            ? "Rejected"
                            : "Completed"}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {new Date(label.submittedAt).toLocaleDateString('es-CO')}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {alertForm && (
        <div className="flex justify-center mt-5 text-2xl text-red-500 font-bold mb-4">
          {alertForm}
        </div>
      )}
    </div>
  )
}

export default requireLabels