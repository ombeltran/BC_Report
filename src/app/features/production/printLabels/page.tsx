'use client'
import { useSearchParams } from "next/navigation";
import Barcode from "@/components/Barcode";

function printLabels() {
    const searchParams = useSearchParams();

    const serial = searchParams.get("serial");
    const upc = searchParams.get("upc");
    const model = searchParams.get("model");

    return (
        <div className="flex flex-col items-center justify-center h-screen w-full px-12 bg-white">
            <div className="flex flex-col items-center justify-center border-2 border-black w-auto">

                {/* Modelo */}
                <h2 className="font-bold text-2xl mb-4 text-black">
                    {model}
                </h2>

                {/* UPC */}
                {
                    upc && <Barcode value={upc || ""} />                    
                }

                {
                    (upc && serial) && <p className="border border-black w-full my-2"></p>
                }

                {/* SERIAL */}
                {
                    serial && <Barcode value={serial || ""} />
                }
                
            </div>

            <div className="flex gap-4 py-2 no-print">
                {/* Oopen printer box */}
                <button
                    className="mt-4 bg-black text-white px-4 py-2 rounded cursor-pointer"
                    onClick={() => window.print()}
                >
                    Print
                </button>

                {/* Botón para volver */}
                <button
                    className="mt-4 bg-black text-white px-4 py-2 rounded cursor-pointer"
                    onClick={() => {
                        window.close()
                        history.back()
                    }}
                >
                    Close and return
                </button>
            </div>
        </div>
    );
}

export default printLabels;
