const cols = ["Ver", "Crear", "Editar", "Eliminar", "Descargar", "Otros"];

const data = [
    {
        "Ver": false,
        "Crear": false,
        "Editar": false,
        "Eliminar": false,
        "Descargar": false,
        "Otros": false,
    },
    {
        "Ver": false,
        "Crear": false,
        "Editar": false,
        "Eliminar": false,
        "Descargar": false,
        "Otros": false,
    },
    {
        "Ver": false,
        "Crear": false,
        "Editar": false,
        "Eliminar": false,
        "Descargar": false,
        "Otros": false,
    },
    {
        "Ver": false,
        "Crear": false,
        "Editar": false,
        "Eliminar": false,
        "Descargar": false,
        "Otros": false,
    },
];

const titles = ["CREAR", "BUSCAR / MODIFICAR", "MEMOFICHAS", "INFORMES"]

const RoleTable: React.FC = () => {
    return (
        <div className="overflow-x-auto rounded-lg border border-[#DEE5ED]">
            <table className="table-auto w-full">
                <thead className="">
                    <tr>
                        <th className="text-sm px-4 text-center py-5 font-medium whitespace-nowrap text-text2 border-b border-[#DEE5ED]">Módulo</th>
                        {cols.map((col, index) => (
                            <th key={index} className="text-sm px-4 text-center py-5 font-medium whitespace-nowrap text-text2 border-b border-[#DEE5ED]">{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((_, i) => (
                        <tr key={i}>
                            <td className="text-sm px-4 py-5 whitespace-nowrap text-text text-center">{titles[i]}</td>
                            {cols.map((_, index) => (
                                <td key={index} className="text-sm px-4 py-5 whitespace-nowrap text-text text-center" >
                                    <input className="size-6 appearance-none rounded-full checked:bg-secn-blue bg-clip-padding bg-[#F5F7F9] ring-1 ring-[#D1D1D1] outline-none" type="radio" name={`radio-permiso-${i}`} />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default RoleTable;