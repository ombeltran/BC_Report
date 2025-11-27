'use client'
import { useState, useEffect } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

function manageLabels() {
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
  interface User {
    id: number;
    name: string;
    lastName: string;
  }


  const [idNum, setIdNum] = useState<number>();
  const [brand, setBrand] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [serialN, setSerialN] = useState<string>("");
  const [upc, setUpc] = useState<string>("");
  const [Qty, setQty] = useState<string>("");
  const [xDate, setXDate] = useState<string>("");
  const [requiredBy, setRequiredBy] = useState<string>("");
  const [labels, setLabels] = useState<Label[]>([]);
  const [users, setUsers] = useState<User[]>([]);

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

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching labels:", error);
    }
  }

  useEffect(() => {
    fetchLabels();
    fetchUsers();
  }, [])

  const handleClick = (item: Label) => {
    setIdNum(item.id);
    setBrand(item.brand);
    setModel(item.model);
    setSerialN(item.seria_N);
    setUpc(item.upc);
    setQty(item.qty.toString());
    setXDate(new Date(item.submittedAt).toLocaleString('es-CO'));

    // Find user name and assign to requiredBy state
    const user = users.find(u => u.id === item.userId);
    setRequiredBy(`${user?.name || ""} ${user?.lastName || ""}`);
  }

  const handleActionClick = async (action: string) => {
    if (!idNum) return alert("Select a label first");

    const updatedLabel = {
      complete: action === "completed",
      rejected: action === "rejected",
    };

    try {
      const response = await fetch(`/api/labels/${idNum}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedLabel),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      alert("Status updated successfully!");

      // Optional: actualizar lista sin recargar
      setLabels(labels.map(label =>
        label.id === idNum ? { ...label, complete: updatedLabel.complete, rejected: updatedLabel.rejected } : label
      ));

    } catch (error) {
      console.error("Error updating label:", error);
      alert("There was an error updating the label.");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center">
      {/* List of label pending for print */}
      <div className="p-12 sm:mt-12">
        <h2 className="py-8 text-3xl font-bold">Pending Request (4)</h2>
        <p className="pb-8">Select a request to view details and take action</p>
        <div className="flex flex-col gap-6">
          <div
            className="flex flex-col gap-6 p-6 h-[500px] overflow-y-auto"
          >
            {
              labels.map((label) => (
                (label.complete === false && label.rejected === false) &&
                (<div
                  className="border-2 border-white rounded-2xl p-3 min-w-[28%] cursor-pointer"
                  key={label.id}
                  onClick={() => handleClick(label)}
                >
                  <h4 className="text-red-600/70 font-bold text-2xl">{label.brand}</h4>
                  <p>{label.model}</p>

                  {
                    (label.complete === false && label.rejected === false) &&
                    <p>Status: <strong className="text-green-600/70">Pending</strong></p>
                  }

                  {
                    users.filter(user => user.id === label.userId).map((user) => (
                      <div key={user.id}>
                        <p>Required by <strong className="text-xl">{user?.name} {user?.lastName}</strong></p>
                      </div>
                    ))
                  }

                  <p>{new Date(label.submittedAt).toLocaleString('es-CO')}</p>

                </div>)
              ))
            }
          </div>
        </div>
      </div>

      {/* Detail of selected request */}
      <div className="border-2 sm:mt-32 px-4 sm:py-0 py-4 border-white overflow-x-auto">
        <div className="border-b border-slate-100/50">
          <h2 className="px-12 pt-4 text-4xl">{brand}</h2>
          <p className="px-12">Request detail</p>
        </div>

        <form className="flex flex-col justify-between sm:h-[80%] h-[450px]">
          <div>
            <div className="flex gap-6 mt-6">
              <div className="flex flex-col gap3">
                <label htmlFor="brand" className="text-slate-100/50">Brand</label>
                <input
                  type="text" id="brand" className="text-xl" value={brand} readOnly />
              </div>

              <div className="flex flex-col gap3">
                <label htmlFor="model" className="text-slate-100/50">Model</label>
                <input type="text" id="model" className="text-xl" value={model} readOnly />
              </div>
            </div>

            <div className="flex gap-6 mt-6">
              <div className="flex flex-col gap3">
                <label htmlFor="serialN" className="text-slate-100/50">Serial Number</label>
                <input type="text" id="serialN" className="text-xl" value={serialN} readOnly />
              </div>

              <div className="flex flex-col gap3">
                <label htmlFor="upc" className="text-slate-100/50">UPC</label>
                <input type="text" id="upc" className="text-xl" value={upc} readOnly />
              </div>
            </div>

            <div className="flex gap-6 mt-6">
              <div className="flex flex-col gap3">
                <label htmlFor="requested" className="text-slate-100/50">Requested by</label>
                <input type="text" id="requested" className="text-xl" value={requiredBy} readOnly />
              </div>

              <div className="flex flex-col gap3">
                <label htmlFor="qty" className="text-slate-100/50">Qty</label>
                <input type="text" id="qty" className="text-xl" value={Qty} readOnly />
              </div>
            </div>

            <div className="flex gap-6 mt-6">
              <div className="flex flex-col gap3">
                <label htmlFor="xdate" className="text-slate-100/50">Date Submitted</label>
                <input type="text" id="xdate" className="text-xl" value={xDate} readOnly />
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-4 p-2">
            <button
              className="flex justify-center items-center gap-2 bg-green-600 py-2 px-4 rounded-xl font-semibold w-[50%]"
              onClick={(e) => { e.preventDefault(); handleActionClick("completed"); }}
            >
              <FaRegCheckCircle className="text-xl" />
              Marck as completed
            </button>
            <button
              className="flex justify-center items-center gap-2 bg-red-600 py-2 px-4 rounded-xl font-semibold w-[50%]"
              onClick={(e) => { e.preventDefault(); handleActionClick("rejected"); }}
            >
              <MdOutlineCancel className="text-2xl" />
              Marck as rejected
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default manageLabels