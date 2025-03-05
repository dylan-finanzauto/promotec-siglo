import { useNavigate } from "@tanstack/react-router";
import Select from "../../components/common/Select";
import Table from "../../components/common/Table";
import SearchCriteria from "../../components/ui/SearchCriteria";
import Dashboard from "../../layouts/Dashboard";

const cols = [
    "Siniestro",
    "Cliente",
    "Ocurrencia novedad",
    "Concesionario",
    "Vehículo",
    "Serie",
    "Placa",
];

const data = [
    {
        Siniestro: "1",
        Cliente: "Archivo 1",
        "Ocurrencia novedad": "Propietario 1",
        Concesionario: "2021-10-10 10:00:00",
        Vehículo: "2021-10-10 10:00:00",
        Serie: "2021-10-10 10:00:00",
        Placa: "2021-10-10 10:00:00",
    },
];


const OptionsContainer: React.FC = () => {

    const navigate = useNavigate();

    const actions = [
        {
            text: "Ver detalle",
            onClick: () => {
                console.log("Detalle clicked")
                navigate({ to: "/detail/98384" })
            },
        },
    ];

    return (
        <Dashboard>
            <div className="flex flex-col gap-5">
                <div className="space-y-2">
                    <h1 className="font-bold text-2xl text-text">
                        Buscar / editar formularios
                    </h1>
                    <p className="text-sm text-text2">
                        Espacio para búsqueda y/o edición de formularios creados
                    </p>
                </div>

                <SearchCriteria>
                    <Select className="w-xs" items={[]} />
                </SearchCriteria>

                <div className="p-4 space-y-5 rounded-[14px] bg-white">
                    <h4 className="font-semibold text-text">Resultado de búsqueda</h4>
                    <Table cols={cols} data={data} actions={actions} />
                </div>
            </div>
        </Dashboard>

    )
}

export default OptionsContainer;