import Barcode from "@/components/Barcode";


function printLabels() {
    return (
        <div className="flex items-center justify-center h-screen w-full px-12 bg-white">
            <div className="flex flex-col items-center justify-center border-2 border-black w-auto">
                <Barcode value="840133997804" />
                <p className="border border-black w-full"></p>
                <Barcode value="NFRC871056116D0121" />
            </div>
        </div>
    )
}

export default printLabels