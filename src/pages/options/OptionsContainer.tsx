import { useNavigate } from "@tanstack/react-router";
import Select from "../../components/common/Select";
import Table from "../../components/common/Table";
import SearchCriteria from "../../components/ui/SearchCriteria";
import Dashboard from "../../layouts/Dashboard";
import { useForm } from "@tanstack/react-form";
import { InputField } from "../../components/common/InputField";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { pagination } from "../../services/ticket";
import useAuth from "../../hooks/useAuth";
import Pagination from "../../components/common/Pagination";
import { PaginatedResponse } from "../../types/Rest";
import { z } from "zod";
import Calendar from "../../components/common/Calendar";
import { formatearFechaISO } from "../../util/date";
import TableSkeleton from "../../components/common/TableSkeleton";
import PaginationSkeleton from "../../components/common/PaginationSkeleton";

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
    filters: z.array(z.object({
        typeFilter: z.string().nonempty(),
        value: z.union([z.string(), z.number(), z.date(), z.object({
            startDate: z.date(),
            endDate: z.date()
        })])
    }))
});

const OptionsContainer: React.FC = () => {
    const [inputValue, setInputValue] = useState(null)
    const [data, setData] = useState<PaginatedResponse<TableRow> | null>(null)
    const { token } = useAuth()
    const navigate = useNavigate();
    const [paginate, setPaginate] = useState({
        page: 1,
        pageSize: 5
    })

    const mutation = useMutation({
        mutationKey: ['pagination'],
        mutationFn: (data: any) => pagination(token.accessToken, data),
        onSuccess: (value) => {
            setData({
                ...value,
                items: value.items.map(t => ({
                    ID: t.ticketId,
                    Siniestro: t.sequenceId,
                    Cliente: t.client,
                    "Ocurrencia novedad": t.occurrenceDate,
                    Concesionario: t.concessionerName,
                    "Vehículo": t.typeVehicleName,
                    Serie: t.serie,
                    Placa: t.plate,
                }))
            })
        }
    })

    const form = useForm({
        defaultValues: {
            filters: [
                {
                    typeFilter: '',
                    value: '' as any,
                }
            ]
        },
        validators: {
            onChange: filterSchema
        },
        onSubmit: ({ value }) => {
            const data = value.filters.reduce((acc, filter) => {
                if (["OccurrenceDate"].includes(filter.typeFilter)) return acc
                if (filter.value instanceof Date) filter.value = formatearFechaISO(filter.value);
                acc[filter.typeFilter] = filter.value
                return acc;
            }, {} as any)
            mutation.mutate({
                ...data,
                pageNumber: paginate.page,
                pageSize: paginate.pageSize
            })
        },
    })

    useEffect(() => {
        form.handleSubmit()
    }, [paginate])

    const actions = [
        {
            text: "Ver detalle",
            onClick: (row: TableRow) => {
                navigate({ to: `/detail/${row.ID}` })
            },
        },
    ];

    return (
        <>
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
                                name="filters"
                                mode="array"
                                children={(field) => {
                                    return (
                                        <>
                                            {/* {field.state.value.map((_, i) => ( */}
                                            <>
                                                <form.Field
                                                    name={`filters[0].typeFilter`}
                                                    children={(subField) => (
                                                        <Select
                                                            className="w-xs"
                                                            items={items}
                                                            name={subField.name}
                                                            value={subField.state.value}
                                                            error={subField.state.meta.errors.length > 0}
                                                            onChange={(e) => {
                                                                subField.handleChange(e)
                                                                form.setFieldValue('filters[0].value', '')
                                                                setInputValue(e)
                                                            }}
                                                            onBlur={subField.handleBlur}
                                                        />
                                                    )}
                                                />
                                                {inputValue && (
                                                    <>
                                                        <form.Field
                                                            name={`filters[0].value`}
                                                            children={(subField) => (
                                                                <>
                                                                    {['OccurrenceDate'].includes(form.getFieldValue(`filters[0].typeFilter`)) ? (
                                                                        <Calendar
                                                                            name={subField.name}
                                                                            value={subField.state.value}
                                                                            range={true}
                                                                            error={subField.state.meta.errors.length > 0}
                                                                            onChange={subField.handleChange}
                                                                            startDate={subField.state.value?.startDate}
                                                                            endDate={subField.state.value?.endDate}
                                                                            onRangeChange={(start, end) => {
                                                                                subField.handleChange({ startDate: start, endDate: end })
                                                                                field.setValue([
                                                                                    {
                                                                                        typeFilter: "OccurrenceDate",
                                                                                        value: { startDate: start, endDate: end }
                                                                                    },
                                                                                    {
                                                                                        typeFilter: "StartOccurrenceDate",
                                                                                        value: start
                                                                                    },
                                                                                    {
                                                                                        typeFilter: "EndOccurrenceDate",
                                                                                        value: end
                                                                                    },
                                                                                ])
                                                                            }}
                                                                            onBlur={field.handleBlur}
                                                                        />
                                                                    ) : (
                                                                        <InputField
                                                                            type={
                                                                                ["ConcessionerId", "TypeVehicleId"].includes(form.getFieldValue(`filters[0].value`)) ? "number" : "text"
                                                                            }
                                                                            id={subField.name}
                                                                            name={subField.name}
                                                                            error={subField.state.meta.errors.length > 0}
                                                                            value={subField.state.value}
                                                                            onChange={(e) => subField.handleChange(e.target.value)}
                                                                            onBlur={subField.handleBlur}
                                                                        />
                                                                    )}

                                                                </>
                                                            )}
                                                        />
                                                    </>
                                                )}
                                            </>
                                            {/* ))} */}
                                        </>
                                    )
                                }}
                            />
                        </div>
                    </SearchCriteria>

                    {mutation.isPending ? (
                        <div className="p-4 space-y-5 rounded-[14px] bg-white">
                            <div className="h-4 bg-gray-200 rounded w-[160px]"></div>
                            <TableSkeleton cols={cols} rows={5} />
                            <PaginationSkeleton />
                        </div>
                    ) : data && (
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
                                    // form.handleSubmit();
                                }}
                            />
                        </div>
                    )}
                </div>
            </Dashboard>
        </>
    )
}

export default OptionsContainer;