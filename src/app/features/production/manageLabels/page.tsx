'use client'
import { useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

function manageLabels() {
  const [brand, setBrand] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [serialN, setSerialN] = useState<string>("");
  const [upc, setUpc] = useState<string>("");
  const [Qty, setQty] = useState<string>("");
  const [xDate, setXDate] = useState<string>("");
  const [requiredBy, setRequiredBy] = useState<string>("");

  const handleClick = () => {
    setBrand("Samsung");
    setModel("QN65LS03DAF");
    setSerialN("SN123456789");
    setUpc("123456789012");
    setQty("3");
    setXDate("11-23-2025 10.30 am");
    setRequiredBy("Oscar Beltran");
  }

  return (
    <div className="flex justify-center">
      {/* List of label pending for print */}
      <div className="p-12 mt-12">
        <h2 className="py-8 text-3xl font-bold">Pending Request (4)</h2>
        <p className="pb-8">Select a request to view details and take action</p>
        <div className="flex flex-col gap-6">
          <div
            className="border-2 border-white rounded-2xl p-3 min-w-[28%] cursor-pointer"
            onClick={handleClick}
          >
            <h4 className="text-red-600/70 font-bold text-2xl">Samsung</h4>
            <p>QN65LS03DAF</p>
            <p>Status: <strong className="text-green-600/70">Pending</strong></p>
            <p>Required by <strong className="text-xl">Oscar Beltran</strong></p>
            <p>11-23-2025 10.30 am</p>
          </div>

          <div className="border-2 border-white rounded-2xl p-3 min-w-[28%]">
            <h4 className="text-red-600/70 font-bold text-2xl">LG</h4>
            <p>OLED65C5PUA</p>
            <p>Status: <strong className="text-green-600/70">Pending</strong></p>
            <p>Required by <strong className="text-xl">Anthonny</strong></p>
            <p>11-23-2025 10.30 am</p>
          </div>
        </div>
      </div>

      {/* Detail of selected request */}
      <div className="border-2 mt-32 px-4 border-white">
        <div className="border-b border-slate-100/50">
          <h2 className="px-12 pt-4 text-4xl">Samsung</h2>
          <p className="px-12">Request detail</p>
        </div>

        <form className="flex flex-col justify-between h-[80%]">
          <div className="">
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
            <button className="flex justify-center items-center gap-2 bg-green-600 py-2 px-4 rounded-xl font-semibold w-[50%]">
              <FaRegCheckCircle className="text-xl" />
              Marck as complete
            </button>
            <button className="flex justify-center items-center gap-2 bg-red-600 py-2 px-4 rounded-xl font-semibold w-[50%]">
              <MdOutlineCancel className="text-2xl"/>
              Reject Request
            </button>
          </div>          
        </form>
      </div>
    </div>
  )
}

export default manageLabels