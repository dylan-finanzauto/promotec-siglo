import SearchIcon from "../../components/common/icons/SearchIcon";
import Table from "../../components/common/Table";
import FileUpload from "../../components/ui/FileUpload";
import Dashboard from "../../layouts/Dashboard";

const cols = ["ID", "Archivo", "Propietario", "Fecha y hora"];

const data = [
    {
        ID: "1",
        Archivo: "Archivo 1",
        Propietario: "Propietario 1",
        "Fecha y hora": "2021-10-10 10:00:00",
    },
    {
        ID: "2",
        Archivo: "Archivo 2",
        Propietario: "Propietario 2",
        "Fecha y hora": "2021-10-10 10:00:00",
    },
    {
        ID: "3",
        Archivo: "Archivo 3",
        Propietario: "Propietario 3",
        "Fecha y hora": "2021-10-10 10:00:00",
    },
];


const actions = [
    {
        text: "Ver detalle",
        onClick: () => {
            console.log("Detalle clicked")
        },
    },
];

const MemosContainer: React.FC = () => {
    return (
        <Dashboard>
            <div className="space-y-5">
                <div className="space-y-2">
                    <h1 className="font-bold text-2xl text-text">Memofichas</h1>
                    <p className="text-sm text-text2">Documentos de soportes adjuntados</p>
                </div>

                <div className="bg-white rounded-[14px] p-5 flex flex-col gap-5">
                    <h2 className="text-text font-bold text-xl">Documentos de soportes</h2>
                    <FileUpload onUpload={() => { }} id="" />
                    <div className="p-5 rounded-2xl border border-[#DEE5ED] space-y-5">
                        <h3 className="font-semibold">Listado de documentos</h3>
                        <div
                            className="h-10 w-[200px] rounded-lg bg-[#F5F7F9] border border-[#DEE5ED] flex"
                        >
                            <input
                                className="outline-none px-4 w-[160px]"
                                type="text"
                                placeholder="Buscar..."
                                name=""
                                id=""
                            />
                            <div
                                className="size-10 border-l border-[#DEE5ED] grid place-items-center"
                            >
                                <SearchIcon className="text-[#7C93B5]" />
                            </div>
                        </div>

                        <Table
                            cols={cols}
                            data={data}
                            actions={actions}
                        />

                    </div>
                </div>
            </div>
        </Dashboard>
    )
}

export default MemosContainer;