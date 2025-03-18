import { useNavigate } from "@tanstack/react-router";
import Select from "../../components/common/Select";
import Table from "../../components/common/Table";
import SearchCriteria from "../../components/ui/SearchCriteria";
import Dashboard from "../../layouts/Dashboard";
import { useForm } from "@tanstack/react-form";
import { InputField } from "../../components/common/InputField";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { pagination } from "../../services/ticket";
import useAuth from "../../hooks/useAuth";
import Pagination from "../../components/common/Pagination";
import { PaginatedResponse } from "../../types/Rest";
import { z } from "zod";

interface TableRow {
    ID: string,
    Siniestro: string,
    Cliente: string,
    "Ocurrencia novedad": string,
    Concesionario: string,
    Vehículo: string,
    Serie: string,
    Placa: string,
}

const cols = [
    "Siniestro",
    "Cliente",
    "Ocurrencia novedad",
    "Concesionario",
    "Vehículo",
    "Serie",
    "Placa",
];

const items = [
    {
        key: 'Número reclamo',
        value: 'SequenceId'
    },
    {
        key: 'Ocurrencia novedad',
        value: 'OccurrenceDate'
    },
    {
        key: 'Concesionario',
        value: 'ConcessionerId'
    },
    {
        key: 'Vehículo',
        value: 'TypeVehicleId'
    },
    {
        key: 'Placas',
        value: 'Plate'
    },
    {
        key: 'Número DUA',
        value: 'NumberDua'
    },
    {
        key: 'Serie',
        value: 'Serie'
    },
    {
        key: 'Nombre conductor',
        value: 'DriverName'
    },
]

const filterSchema = z.object({
    typeFilter: z.string().nonempty(),
    value: z.string().nonempty()
})

const OptionsContainer: React.FC = () => {
    const [showInputValue, setShowInputValue] = useState(false)
    const [data, setData] = useState<PaginatedResponse<TableRow> | null>(null)
    const { token } = useAuth()
    const navigate = useNavigate();
    const [paginate, setPaginate] = useState({
        page: 1,
        pageSize: 5
    })

    // useEffect(() => {
    //     if (paginate.page > 1) {
    //         form.handleSubmit();
    //     }
    // }, [paginate]);

    const mutation = useMutation({
        mutationKey: ['pagination'],
        mutationFn: (data: any) => pagination(token.accessToken, data),
        onSuccess: (value) => {
            console.log("value data: ", value)
            setData({
                ...value,
                items: value.items.map(t => ({
                    ID: t.ticketId,
                    Siniestro: t.sequenceId,
                    Cliente: t.client,
                    "Ocurrencia novedad": t.occurrenceDate,
                    Concesionario: t.concessionerName,
                    Vehículo: t.typeVehicleName,
                    Serie: t.serie,
                    Placa: t.plate,
                }))
            })
        }
    })

    const form = useForm({
        defaultValues: {
            typeFilter: '',
            value: ''
        },
        validators: {
            onChange: filterSchema
        },
        onSubmit: ({ value }) => {
            console.log("data: ", { [value.typeFilter]: value.value })
            mutation.mutate({
                [value.typeFilter]: value.value,
                pageNumber: paginate.page,
                pageSize: paginate.pageSize
            })
            // form.reset()
        }
    })

    const actions = [
        {
            text: "Ver detalle",
            onClick: (row: TableRow) => {
                console.log("Detalle clicked")
                navigate({ to: `/detail/${row.ID}` })
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

                <SearchCriteria onSearch={() => {
                    setPaginate(v => ({ ...v, page: 1 }))
                    form.handleSubmit();
                }}>
                    <div className="flex gap-2">
                        <form.Field
                            name="typeFilter"
                            children={(field) => (
                                <Select
                                    className="w-xs"
                                    items={items}
                                    name={field.name}
                                    value={field.state.value}
                                    error={field.state.meta.errors.length > 0}
                                    onChange={(e) => {
                                        field.handleChange(e)
                                        setShowInputValue(e ? true : false)
                                    }}
                                    onBlur={field.handleBlur}
                                />
                            )}
                        />
                        {showInputValue && (
                            <>
                                <form.Field
                                    name="value"
                                    children={(field) => (
                                        <InputField
                                            type={
                                                ["ConcessionerId", "TypeVehicleId"].includes(form.getFieldValue('typeFilter')) ? "number" : "text"
                                            }
                                            id={field.name}
                                            name={field.name}
                                            error={field.state.meta.errors.length > 0}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                        />
                                    )}
                                />
                            </>
                        )}
                    </div>
                </SearchCriteria>

                {data && (
                    <div className="p-4 space-y-5 rounded-[14px] bg-white">
                        <h4 className="font-semibold text-text">Resultado de búsqueda</h4>
                        <Table cols={cols} data={data.items} actions={actions} />
                        <Pagination
                            page={paginate.page}
                            pageSize={paginate.pageSize}
                            totalCount={data.totalCount}
                            hasNextPage={data.hasNextPage}
                            hasPreviousPage={data.hasPreviousPage}
                            onPageChange={(page: number) => {
                                setPaginate(v => ({ ...v, page }))
                                form.handleSubmit();
                            }}
                        />
                    </div>
                )}

            </div>
        </Dashboard>

    )
}

export default OptionsContainer;