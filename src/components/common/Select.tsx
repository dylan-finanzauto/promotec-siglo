import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import ChevronDownIcon from "./icons/ChevronDownIcon";

type Item = {
    key: string;
    value: any;
};

type Props = {
    items: Item[];
    className?: string;
    name: string;
    value: any;
    error: boolean;
    onChange: (value: any) => void;
    onBlur: () => void;
};

export default function Select({ items, className, name, value, error, onChange, onBlur }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<null | Item>(items.find(item => item.value === value) || null);
    const containerRef = useRef<HTMLDivElement>(null);
    const selectRef = useRef<HTMLDivElement>(null);
    const [actionPosition, setActionPosition] = useState<{ top?: number; left?: number; bottom?: number } | null>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleSelect = (item: Item) => {
        setSelectedItem(item);
        setIsOpen(false);
        onChange(item.value);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isOpen && containerRef.current && !(containerRef.current as Element).contains(event.target as Node)) {
                setIsOpen(false);
                onBlur();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onBlur]);

    useEffect(() => {
        const rect = selectRef.current?.getBoundingClientRect();
        if (rect) {
            const windowHeight = window.innerHeight;
            const dropdownHeight = 248;
            const spaceBelow = windowHeight - rect.bottom;
            const spaceAbove = rect.top;

            if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
                setActionPosition({ top: rect.top + window.scrollY - dropdownHeight, left: rect.left + window.scrollX });
            } else {
                setActionPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
            }
        }
    }, [isOpen]);

    return (
        <div className="" ref={containerRef}>
            <div
                className={clsx(
                    "h-10 border border-[#DEE5ED] rounded-lg px-3 py-[10px] flex justify-between items-center gap-2 cursor-pointer",
                    isOpen ? "outline-2" : "",
                    isOpen && error ? "outline-red-500" : "outline-secn-blue",
                    error ? "border-red-500" : "",
                    className
                )}
                onClick={toggleDropdown}
                ref={selectRef}
            >
                <span className="text-[#1F2024] text-[14px] truncate">{selectedItem ? selectedItem.key : "Seleccione una opción"}</span>
                <ChevronDownIcon className="text-[#1F2024]" />
            </div>
            {isOpen && actionPosition && (
                <ul
                    className="absolute w-full h-[248px] overflow-y-auto rounded-lg py-2 bg-white border border-[#DEE5ED] mt-1 z-10 shadow-lg"
                    style={{ top: actionPosition.top, left: actionPosition.left, width: selectRef.current?.clientWidth }}
                >
                    {items.map((i) => (
                        <li
                            key={i.value}
                            className={clsx(
                                "py-3 px-4 cursor-pointer",
                                selectedItem == i ? "bg-white2" : "hover:bg-white2"
                            )}
                            onClick={() => handleSelect(i)}
                        >
                            {i.key}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}