import OptionsIcon from "../../../components/common/icons/OptionsIcon";
import TrashIcon from "../../../components/common/icons/TrashIcon";
import Select from "../../../components/common/Select";
import { useStore as tdStore } from "../../../store/typeDamage";
import { useStore as tpStore } from "../../../store/typePiece";
import { useStore as attriStore } from "../../../store/attributable";
import { useStore as stateStore } from "../../../store/state";
import { useStore as typologyStore } from "../../../store/typology";
import { useStore as sdStore } from "../../../store/sizeDamage";
import { useForm } from "@tanstack/react-form";
import { InputField } from "../../../components/common/InputField";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import SpinnerIcon from "../../../components/common/icons/SpinnerIcon";
import { Piece } from "../../../types/Ticket";
import { Piece as AddPiece } from "../../../types/Rest";
import CheckIcon from "../../../components/common/icons/CheckIcon";
import RadioGroup from "../../../components/common/RadioGroup";
import { useAlert } from "../../../hooks/useAlert";

type Action = {
    text: string,
    onClick: (row: any) => void
}

type Props = {
    pieces: AddPiece[],
    onAdd: (piece: AddPiece) => void,
    actions?: Action[]
}

const TableParts: React.FC<Props> = ({ pieces, onAdd, actions }) => {

    const [isInput, setIsInput] = useState(false);
    const { addAlert } = useAlert()
    const [rowSelected, setRowSelected] = useState(null);
    const [actionPosition, setActionPosition] = useState<{ top: number, left: number } | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { typeDamages } = tdStore((state) => state)
    const { typePieces } = tpStore((state) => state)
    const { attributables } = attriStore((state) => state)
    const { states } = stateStore((state) => state)
    const { typologies } = typologyStore((state) => state)
    const { sizeDamages } = sdStore((state) => state)

    const mappedPieces: Piece[] = useMemo(() => pieces.map(piece => ({
        ...piece,
        typePieceName: typePieces.find(tp => tp.id == piece.typePieceId)?.name ?? '',
        typeDamageName: typeDamages.find(td => td.id == piece.typeDamageId)?.name ?? '',
        sizeDamageName: sizeDamages.find(sd => sd.id == piece.sizeDamageId)?.name ?? '',
        attributableName: attributables.find(a => a.id == piece.attributableId)?.name ?? '',
        stateIdName: states.find(s => s.id == piece.stateId)?.name ?? '',
        typologyName: typologies.find(t => t.id == piece.typologyId)?.name ?? '',
    } as Piece)), [pieces, typePieces, typeDamages, sizeDamages, attributables, states, typologies]);

    const form = useForm({
        defaultValues: {
            typeDamageId: 0,
            typePieceId: 0,
            sizeDamageId: 0,
            count: 0,
            replace: false,
            amount: 0,
            attributableId: 0,
            stateId: 0,
            typologyId: 0,
        },
        onSubmit: ({ value }) => {
            onAdd(value)
            form.reset()
        },
        onSubmitInvalid: () => {
            addAlert("error", "Añadir pieza", "Existen campos pendientes por diligenciar")
        }
    })

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !(containerRef.current as Element).contains(event.target as Node)) {
                setRowSelected(null);
                setActionPosition(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [rowSelected]);

    const handleSelect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, row: any) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setRowSelected(row);
        setActionPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
    };

    return (
        <>

            <div className="p-5 rounded-[10px] border border-princ-blue space-y-3">
                <div className="flex justify-between">
                    <h4 className="font-semibold">Registro de piezas</h4>
                    {!isInput ? (
                        <button className="rounded-lg border border-tirth h-10 inline-flex items-center px-10 text-tirth cursor-pointer hover:bg-white2 hover:border-white2 hover:text-text transition outline-none" onClick={() => setIsInput(true)}>Añadir pieza</button>
                    ) : (
                        <form.Subscribe
                            selector={(state) => [state.canSubmit, state.isSubmitting]}
                            children={([canSubmit, isSubmitting]) => (
                                <button className="rounded-lg border h-10 inline-flex items-center px-4 cursor-pointer bg-white2 border-white2 text-text hover:bg-white2 hover:border-white2 hover:text-text transition outline-none" disabled={!canSubmit || isSubmitting} onClick={() => form.handleSubmit()}>
                                    {isSubmitting ? (
                                        <SpinnerIcon />
                                    ) : (
                                        <div className="flex gap-2 text-[#7C93B5] items-center">
                                            {/* <span>Añadir pieza</span> */}
                                            <CheckIcon className="size-4" />
                                        </div>
                                    )}
                                </button>
                            )}
                        />
                    )}
                </div>
                <div className="">

                    <div className="grid grid-cols-[repeat(11,1fr)] overflow-auto rounded-lg border border-[#DEE5ED]">

                        <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text2 border-b border-[#DEE5ED]">#</div>
                        <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text2 border-b border-[#DEE5ED]">Tipo daño</div>
                        <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text2 border-b border-[#DEE5ED]">Pieza</div>
                        <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text2 border-b border-[#DEE5ED]">Tamaño daño</div>
                        <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text2 border-b border-[#DEE5ED]">Cant. Faltante</div>
                        <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text2 border-b border-[#DEE5ED]">Cambio pieza</div>
                        <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text2 border-b border-[#DEE5ED]">Valor pieza</div>
                        <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text2 border-b border-[#DEE5ED]">Atribuible</div>
                        <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text2 border-b border-[#DEE5ED]">Estado</div>
                        <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text2 border-b border-[#DEE5ED]">Tipología</div>
                        <div className="text-sm sticky right-0 px-3 py-2 bg-white shadow-lg border-b border-[#DEE5ED]"></div>

                        {isInput && (
                            <>
                                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text border-b border-[#DEE5ED]">
                                    4
                                </div>
                                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text border-b border-[#DEE5ED]">
                                    <form.Field
                                        name="typeDamageId"
                                        validators={{
                                            onChange: ({ value }) => !value ? 'Cliente requerido' : undefined
                                        }}
                                        children={(field) => (
                                            <>
                                                <Select
                                                    items={typeDamages.map(c => ({ key: c.name, value: c.id }))}
                                                    name={field.name}
                                                    value={field.state.value}
                                                    error={field.state.meta.errors.length > 0}
                                                    onChange={field.handleChange}
                                                    onBlur={field.handleBlur}
                                                />
                                            </>
                                        )}
                                    />
                                </div>
                                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text border-b border-[#DEE5ED]">
                                    <form.Field
                                        name="typePieceId"
                                        validators={{
                                            onChange: ({ value }) => !value ? 'Cliente requerido' : undefined
                                        }}
                                        children={(field) => (
                                            <>
                                                <Select
                                                    items={typePieces.map(c => ({ key: c.name, value: c.id }))}
                                                    name={field.name}
                                                    value={field.state.value}
                                                    error={field.state.meta.errors.length > 0}
                                                    onChange={field.handleChange}
                                                    onBlur={field.handleBlur}
                                                />
                                            </>
                                        )}
                                    />
                                </div>
                                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text border-b border-[#DEE5ED]">
                                    <form.Field
                                        name="sizeDamageId"
                                        validators={{
                                            onChange: ({ value }) => !value ? 'Cliente requerido' : undefined
                                        }}
                                        children={(field) => (
                                            <>
                                                <Select
                                                    items={sizeDamages.map(c => ({ key: c.name, value: c.id }))}
                                                    name={field.name}
                                                    value={field.state.value}
                                                    error={field.state.meta.errors.length > 0}
                                                    onChange={field.handleChange}
                                                    onBlur={field.handleBlur}
                                                />
                                            </>
                                        )}
                                    />
                                </div>
                                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text border-b border-[#DEE5ED]">
                                    <form.Field
                                        name="count"
                                        validators={{
                                            onChange: ({ value }) => !value ? 'Código consecionario requerido' : undefined
                                        }}
                                        children={(field) => (
                                            <>
                                                <InputField
                                                    type="number"
                                                    id={field.name}
                                                    name={field.name}
                                                    error={field.state.meta.errors.length > 0}
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(parseInt(e.target.value))}
                                                />
                                                {/* <FieldInfo field={field} /> */}
                                            </>
                                        )} />
                                </div>
                                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text border-b border-[#DEE5ED]">
                                    <form.Field
                                        name="replace"
                                        children={(field) => (
                                            <RadioGroup
                                                name={field.name}
                                                error={field.state.meta.errors.length > 0}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={field.handleChange}
                                                options={[
                                                    {
                                                        label: 'Si',
                                                        value: true
                                                    },
                                                    {
                                                        label: 'No',
                                                        value: false
                                                    }
                                                ]}
                                            />
                                        )} />
                                </div>
                                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text border-b border-[#DEE5ED]">
                                    <form.Field
                                        name="amount"
                                        validators={{
                                            onChange: ({ value }) => !value ? 'Código consecionario requerido' : undefined
                                        }}
                                        children={(field) => (
                                            <>
                                                <InputField
                                                    type="number"
                                                    id={field.name}
                                                    name={field.name}
                                                    error={field.state.meta.errors.length > 0}
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(parseInt(e.target.value))}
                                                />
                                                {/* <FieldInfo field={field} /> */}
                                            </>
                                        )} />
                                </div>
                                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text border-b border-[#DEE5ED]">
                                    <form.Field
                                        name="attributableId"
                                        validators={{
                                            onChange: ({ value }) => !value ? 'Cliente requerido' : undefined
                                        }}
                                        children={(field) => (
                                            <>
                                                <Select
                                                    items={attributables.map(c => ({ key: c.name, value: c.id }))}
                                                    name={field.name}
                                                    value={field.state.value}
                                                    error={field.state.meta.errors.length > 0}
                                                    onChange={field.handleChange}
                                                    onBlur={field.handleBlur}
                                                />
                                            </>
                                        )}
                                    />
                                </div>
                                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text border-b border-[#DEE5ED]">
                                    <form.Field
                                        name="stateId"
                                        validators={{
                                            onChange: ({ value }) => !value ? 'Cliente requerido' : undefined
                                        }}
                                        children={(field) => (
                                            <>
                                                <Select
                                                    items={states.map(c => ({ key: c.name, value: c.id }))}
                                                    name={field.name}
                                                    value={field.state.value}
                                                    error={field.state.meta.errors.length > 0}
                                                    onChange={field.handleChange}
                                                    onBlur={field.handleBlur}
                                                />
                                            </>
                                        )}
                                    />
                                </div>
                                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text border-b border-[#DEE5ED]">
                                    <form.Field
                                        name="typologyId"
                                        validators={{
                                            onChange: ({ value }) => !value ? 'Cliente requerido' : undefined
                                        }}
                                        children={(field) => (
                                            <>
                                                <Select
                                                    items={typologies.map(c => ({ key: c.name, value: c.id }))}
                                                    name={field.name}
                                                    value={field.state.value}
                                                    error={field.state.meta.errors.length > 0}
                                                    onChange={field.handleChange}
                                                    onBlur={field.handleBlur}
                                                />
                                            </>
                                        )}
                                    />
                                </div>
                                <div className="text-sm sticky right-0 px-3 py-2 bg-white shadow-lg grid place-items-center border-b border-[#DEE5ED]">
                                    <button className="grid place-items-center rounded-lg size-10 hover:bg-[#EDEFF7] transition cursor-pointer" onClick={() => {
                                        setIsInput(false)
                                        form.reset()
                                    }}>
                                        <TrashIcon className="text-[#7C93B5]" />
                                    </button>
                                </div>
                            </>
                        )}

                        {mappedPieces.map((p, i) => (
                            <Fragment key={i}>
                                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text">3</div>
                                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text">{p.typeDamageName}</div>
                                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text">{p.typePieceName}</div>
                                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text">{p.sizeDamageName}</div>
                                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text">{p.count}</div>
                                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text">{p.replace ? 'Si' : 'No'}</div>
                                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text">{p.amount}</div>
                                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text">{p.attributableName}</div>
                                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text">{p.stateIdName}</div>
                                <div className="text-sm px-4 py-5 font-medium whitespace-nowrap text-text">{p.typologyName}</div>
                                <div className="text-sm sticky right-0 px-3 py-2 bg-white shadow-lg grid place-items-center">
                                    <button className="grid place-items-center rounded-lg size-10 hover:bg-[#EDEFF7] transition cursor-pointer" onClick={(e) => handleSelect(e, p)}>
                                        <OptionsIcon className="text-[#7C93B5]" />
                                    </button>
                                </div>
                            </Fragment>
                        ))}

                    </div>


                </div>
            </div>

            {actionPosition && rowSelected && actions && (
                <div className="absolute z-10" ref={containerRef} style={{ top: actionPosition.top, left: actionPosition.left }}>
                    <ul className="w-[180px] max-h-[248px] overflow-y-auto rounded-lg py-2 bg-white border border-[#DEE5ED] mt-1 shadow-lg">
                        <li className="py-3 px-4 font-semibold">Acciones</li>
                        {actions.map((action, index) => (
                            <li key={index} className="py-3 px-4 cursor-pointer hover:bg-white2" onClick={() => {
                                action.onClick(rowSelected);
                                setRowSelected(null);
                            }
                            }>{action.text}</li>
                        ))}
                    </ul>
                </div>
            )}


        </>
    )
}

export default TableParts;
