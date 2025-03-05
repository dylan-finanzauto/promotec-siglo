import { useState } from "react"
import TableParts from "../tables/TableParts"
import clsx from "clsx";

type Props = {

}

const TicketParts: React.FC<Props> = () => {

    const [isInput, setIsInput] = useState(false);

    return (
        <>
            <div className="p-5 rounded-[10px] border border-princ-blue space-y-3">
                <div className="flex justify-between">
                    <h4 className="font-semibold">Registro de piezas</h4>
                    <button className={clsx("rounded-lg border border-tirth h-10 inline-flex items-center px-10 text-tirth cursor-pointer [&.active]:bg-white2 [&.active]:border-white2 [&.active]:text-text hover:bg-white2 hover:border-white2 hover:text-text transition outline-none", isInput ? "active" : "")} onClick={() => setIsInput(true)}>Añadir pieza</button>
                </div>
                <div className="">
                    <TableParts isInput={isInput} onNoInput={() => setIsInput(false)} />
                </div>
            </div>
        </>
    )
}

export default TicketParts;
