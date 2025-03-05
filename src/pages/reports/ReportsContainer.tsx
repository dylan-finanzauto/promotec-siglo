import { useState } from "react";
import Calendar from "../../components/common/Calendar";
import DocumentOutlinedIcon from "../../components/common/icons/DocumentOutlinedIcon";
import DownloadOutlinedIcon from "../../components/common/icons/DownloadOutlinedIcon";
import SearchCriteria from "../../components/ui/SearchCriteria";
import Dashboard from "../../layouts/Dashboard";

type File = {
    title: string,
    size: string,
}

const File: React.FC<{ file: File }> = ({ file }) => {
    return (
        <div className="p-3 flex gap-2 items-center rounded-2xl border border-[#D1D1D1]">
            <div className="size-10 grid place-items-center">
                <DocumentOutlinedIcon className="text-secn-blue" />
            </div>
            <div className="flex-grow flex flex-col gap-1">
                <h4 className="text-sm font-semibold">{file.title}</h4>
                <span className="text-xs text-text3">{file.size}</span>
            </div>
            <button className="size-10 bg-tirth rounded-xl grid place-items-center cursor-pointer">
                <DownloadOutlinedIcon className="text-white" />
            </button>
        </div>
    )
}

const files: File[] = [
    {
        title: "Reclamos",
        size: "5.4 MB"
    },
    {
        title: "Reporte general Siniestros",
        size: "5.4 MB"
    },
]

const ReportsContainer: React.FC = () => {

    const [showResults, setShowResults] = useState(false);

    return (
        <Dashboard>
            <div className="space-y-5">
                <div className="space-y-2">
                    <h1 className="font-bold text-2xl text-text">Informes</h1>
                    <p className="text-sm text-text2">
                        Información consolidada para exportar
                    </p>
                </div>

                <SearchCriteria onSearch={() => setShowResults(true)}>
                    <Calendar className="w-xs" />
                </SearchCriteria>


                {showResults && (
                    <div className="p-5 bg-white rounded-[14px] space-y-5">
                        <h2 className="text-xl text-text font-bold">Resultado de búsqueda</h2>
                        <div className="space-y-4">
                            {files.map(f => (
                                <File file={f} />
                            ))}
                        </div>
                    </div>
                )}


            </div>
        </Dashboard>

    )
}

export default ReportsContainer;