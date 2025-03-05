import OptionsIcon from "../../../components/common/icons/OptionsIcon";
import TrashIcon from "../../../components/common/icons/TrashIcon";
import Select from "../../../components/common/Select";
import { useStore as tdStore } from "../../../store/typeDamage";
import { useStore as tpStore } from "../../../store/typePiece";
import { useStore as attriStore } from "../../../store/attributable";
import { useStore as stateStore } from "../../../store/state";
import { useStore as typologyStore } from "../../../store/typology";
import { useStore as sdStore } from "../../../store/sizeDamage";

type Props = {
    isInput: boolean,
    onNoInput: () => void
}

const TableParts: React.FC<Props> = ({ isInput, onNoInput }) => {

    const { typeDamages } = tdStore((state) => state)
    const { typePieces } = tpStore((state) => state)
    const { attributables } = attriStore((state) => state)
    const { states } = stateStore((state) => state)
    const { typologies } = typologyStore((state) => state)
    const { sizeDamages } = sdStore((state) => state)

    return (
        <>
            <div className="grid grid-cols-[repeat(13,1fr)] overflow-auto rounded-lg border border-[#DEE5ED]">

                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text2 border-b border-[#DEE5ED]">#</div>
                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text2 border-b border-[#DEE5ED]">Tipo daño</div>
                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text2 border-b border-[#DEE5ED]">Pieza</div>
                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text2 border-b border-[#DEE5ED]">Tamaño daño</div>
                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text2 border-b border-[#DEE5ED]">Cant. Faltante</div>
                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text2 border-b border-[#DEE5ED]">Cambio pieza</div>
                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text2 border-b border-[#DEE5ED]">Valor pieza</div>
                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text2 border-b border-[#DEE5ED]">Atribuible</div>
                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text2 border-b border-[#DEE5ED]">No. Fact. recobro</div>
                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text2 border-b border-[#DEE5ED]">Valor recobro</div>
                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text2 border-b border-[#DEE5ED]">Estado</div>
                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text2 border-b border-[#DEE5ED]">Tipología</div>
                <div className="text-sm sticky right-0 px-3 py-2 bg-white shadow-lg border-b border-[#DEE5ED]"></div>

                {isInput && (
                    <>
                        <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text border-b border-[#DEE5ED]">
                            4
                        </div>
                        <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text border-b border-[#DEE5ED]">
                            <Select items={typeDamages.map(td => ({ key: td.name, value: td.id }))} className="w-[248px] bg-[#F5F7F9]" />
                        </div>
                        <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text border-b border-[#DEE5ED]">
                            <Select items={typePieces.map(tp => ({ key: tp.name, value: tp.id }))} className="bg-[#F5F7F9]" />
                        </div>
                        <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text border-b border-[#DEE5ED]">
                            <Select items={sizeDamages.map(sd => ({ key: sd.name, value: sd.id }))} className="bg-[#F5F7F9]" />
                        </div>
                        <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text border-b border-[#DEE5ED]">
                            <input
                                className="h-10 border w-min border-[#DEE5ED] rounded-lg px-3 py-[10px] outline-secn-blue bg-[#F5F7F9]"
                                type="text"
                                name=""
                                id=""
                            />
                        </div>
                        <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text border-b border-[#DEE5ED]">
                            <div className="flex gap-5">
                                <label htmlFor="radio-1" className="flex items-center gap-[5px]">
                                    <span>Si</span>
                                    <input className="size-6 appearance-none rounded-full checked:bg-secn-blue bg-clip-padding bg-[#F5F7F9] ring-1 ring-[#D1D1D1] outline-none" type="radio" name="change-piece1" id="radio-1" />
                                </label>
                                <label htmlFor="radio-2" className="flex items-center gap-[5px]">
                                    <span>No</span>
                                    <input className="size-6 appearance-none rounded-full checked:bg-secn-blue bg-clip-padding bg-[#F5F7F9] ring-1 ring-[#D1D1D1] outline-none" type="radio" name="change-piece1" id="radio-2" />
                                </label>
                            </div>
                        </div>
                        <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text border-b border-[#DEE5ED]">
                            <input
                                className="h-10 border w-min border-[#DEE5ED] rounded-lg px-3 py-[10px] outline-secn-blue bg-[#F5F7F9]"
                                type="text"
                                name=""
                                id=""
                            />
                        </div>
                        <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text border-b border-[#DEE5ED]">
                            <Select items={attributables.map(a => ({ key: a.name, value: a.id }))} className="bg-[#F5F7F9]" />
                        </div>
                        <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text border-b border-[#DEE5ED]">
                            <input
                                className="h-10 border w-min border-[#DEE5ED] bg-[#F5F7F9] rounded-lg px-3 py-[10px] outline-secn-blue"
                                type="text"
                                name=""
                                id=""
                            />
                        </div>
                        <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text border-b border-[#DEE5ED]">
                            <input
                                className="h-10 border w-min border-[#DEE5ED] bg-[#F5F7F9] rounded-lg px-3 py-[10px] outline-secn-blue"
                                type="text"
                                name=""
                                id=""
                            />
                        </div>
                        <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text border-b border-[#DEE5ED]">
                            <Select items={states.map(s => ({ key: s.name, value: s.id }))} className="bg-[#F5F7F9]" />
                        </div>
                        <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text border-b border-[#DEE5ED]">
                            <Select items={typologies.map(t => ({ key: t.name, value: t.id }))} className="bg-[#F5F7F9]" />
                        </div>
                        <div className="text-sm sticky right-0 px-3 py-2 bg-white shadow-lg grid place-items-center border-b border-[#DEE5ED]">
                            <button className="grid place-items-center rounded-lg size-10 hover:bg-[#EDEFF7] transition cursor-pointer" onClick={() => onNoInput()}>
                                <TrashIcon className="text-[#7C93B5]" />
                            </button>
                        </div>
                    </>
                )}

                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text">3</div>
                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text">4. Golpeado</div>
                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text">Puerta delantera derecha</div>
                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text">Hasta 2.5cm de largo y/o diámetro</div>
                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text">1</div>
                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text">
                    <div className="flex gap-5">
                        <label htmlFor="radio-1" className="flex items-center gap-[5px]">
                            <span>Si</span>
                            <input className="size-6 appearance-none rounded-full bg-white checked:bg-secn-blue bg-clip-padding ring-1 ring-[#D1D1D1] outline-none" type="radio" name="change-piece" id="radio-1" />
                        </label>
                        <label htmlFor="radio-2" className="flex items-center gap-[5px]">
                            <span>No</span>
                            <input className="size-6 appearance-none rounded-full bg-white checked:bg-secn-blue bg-clip-padding ring-1 ring-[#D1D1D1] outline-none" type="radio" name="change-piece" id="radio-2" />
                        </label>
                    </div>
                </div>
                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text">$ 150.000</div>
                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text">Al día</div>
                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text">0000000000</div>
                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text">$ 00000000</div>
                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text">CONCESIONARIO FACTURADO</div>
                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text">N/A</div>
                <div className="text-sm sticky right-0 px-3 py-2 bg-white shadow-lg grid place-items-center">
                    <button className="grid place-items-center rounded-lg size-10 hover:bg-[#EDEFF7] transition cursor-pointer">
                        <OptionsIcon className="text-[#7C93B5]" />
                    </button>
                </div>

            </div>

        </>
    )
}

export default TableParts;
