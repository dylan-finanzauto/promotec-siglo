import type React from "react";

type Props = {
    onSearch: () => void,
    children: React.ReactNode
}

const SearchCriteria: React.FC<Props> = ({ children, onSearch }) => {
    return (
        <div className="p-4 space-y-5 rounded-[14px] bg-white">
            <h3 className="text-xl font-bold text-text">Criterio de búsqueda</h3>
            <div className="flex gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-[#2F3036] text-xs font-semibold"
                    >Buscar por</label>
                    {children}
                </div>
                <button className="h-10 self-end rounded-lg bg-tirth text-white w-[200px] cursor-pointer" onClick={() => onSearch()}>Buscar</button>
            </div>

        </div>
    )
}

export default SearchCriteria;