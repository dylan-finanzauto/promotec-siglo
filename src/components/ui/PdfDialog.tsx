import { useState } from "react"
import Dialog from "./Dialog"
import XIcon from "../common/icons/XIcon"

type Props = {
    b64: string
}

const PdfDialog: React.FC<Props> = ({ b64 }) => {

    const [isOpen, setIsOpen] = useState(true)

    return (
        <Dialog isOpen={isOpen}>
            <div className="rounded-2xl bg-white p-8 w-5xl min-w-0 relative">
                <div className="space-y-6">
                    <button className="size-10 grid place-items-center absolute top-0 right-0 mt-6 mr-6 cursor-pointer" onClick={() => setIsOpen(false)}>
                        <XIcon className="size-4" />
                    </button>
                    <h2 className="text-2xl font-semibold">Pdf - DUA</h2>
                    <p className="text-sm">Visualice el documento seleccionado.</p>
                    <object data={"data:application/pdf;base64," + b64} type="application/pdf" width="100%" height="769px" className="min-h-0"></object>
                </div>
            </div>
        </Dialog>
    )
}

export default PdfDialog;