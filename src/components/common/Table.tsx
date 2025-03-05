import { useEffect, useRef, useState } from "react";
import OptionsIcon from "./icons/OptionsIcon";

type Action = {
    text: string,
    onClick: () => void
}

type Props = {
    cols: string[],
    data: any[],
    actions?: Action[]
}

const Table: React.FC<Props> = ({ cols, data, actions }) => {

    const [rowSelected, setRowSelected] = useState(null);
    const [actionPosition, setActionPosition] = useState<{ top: number, left: number } | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

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
            <div className="overflow-x-auto rounded-lg border border-[#DEE5ED]">
                <table className="table-auto w-full">
                    <thead className="">
                        <tr>
                            {cols.map((col, index) => (
                                <th key={index} className="text-sm px-4 text-center py-5 font-medium whitespace-nowrap text-text2 border-b border-[#DEE5ED]">{col}</th>
                            ))}
                            <th className="px-3 py-2 border-b border-[#DEE5ED]"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, i) => (
                            <tr key={i}>
                                {cols.map((col, index) => (
                                    <td key={index} className="text-sm px-4 py-5 whitespace-nowrap text-text text-center">{row[col]}</td>
                                ))}
                                {actions && (
                                    <td className="relative px-3 py-2 grid place-items-center">
                                        <button className="grid place-items-center rounded-lg size-10 hover:bg-[#EDEFF7] transition cursor-pointer" onClick={(e) => handleSelect(e, row)}>
                                            <OptionsIcon className="text-[#7C93B5]" />
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {actionPosition && rowSelected && actions && (
                <div className="absolute z-10" ref={containerRef} style={{ top: actionPosition.top, left: actionPosition.left }}>
                    <ul className="w-[180px] max-h-[248px] overflow-y-auto rounded-lg py-2 bg-white border border-[#DEE5ED] mt-1 shadow-lg">
                        <li className="py-3 px-4 font-semibold">Acciones</li>
                        {actions.map((action, index) => (
                            <li key={index} className="py-3 px-4 cursor-pointer hover:bg-white2" onClick={action.onClick}>{action.text}</li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default Table;
