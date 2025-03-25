import { useQuery } from "@tanstack/react-query";
import SearchIcon from "../../components/common/icons/SearchIcon";
import Table from "../../components/common/Table";
import FileUpload from "../../components/ui/FileUpload";
import Dashboard from "../../layouts/Dashboard";
import useAuth from "../../hooks/useAuth";
import { pagination } from "../../services/memofile";
import { useEffect, useState } from "react";
import TableSkeleton from "../../components/common/TableSkeleton";
import PaginationSkeleton from "../../components/common/PaginationSkeleton";
import Pagination from "../../components/common/Pagination";
import { PaginationResponse } from "../../types/Rest";

const cols = ["ID", "Archivo", "Propietario", "Fecha y hora"];

const MemosContainer: React.FC = () => {

    const [paginate, setPaginate] = useState<PaginationResponse>({
        hasNextPage: false,
        hasPreviousPage: false,
        page: 1,
        pageSize: 5,
        totalCount: 0
    })
    const { token } = useAuth()

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["memofiles"],
        queryFn: () => pagination(token.accessToken, { PageNumber: paginate.page, PageSize: paginate.pageSize })
    })

    const actions = [
        {
            text: "Editar",
            onClick: () => {
                console.log("Edit clicked")
            },
        },
        {
            text: "Eliminar",
            onClick: () => {
                console.log("Delete clicked")
            },
        },
    ];

    useEffect(() => {
        refetch()
    }, [paginate])

    return (
        <Dashboard>
            <div className="space-y-5">
                <div className="space-y-2">
                    <h1 className="font-bold text-2xl text-text">Memofichas</h1>
                    <p className="text-sm text-text2">Documentos de soportes adjuntados</p>
                </div>

                <div className="bg-white rounded-[14px] p-5 flex flex-col gap-5">
                    <h2 className="font-semibold">Listado de documentos</h2>
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
                    <FileUpload onUpload={() => { refetch() }} url={`${import.meta.env.VITE_API_URL}/memo-file`} />

                    {isLoading ? (
                        <div className="p-4 space-y-5 rounded-[14px] bg-white">
                            <div className="h-4 bg-gray-200 rounded w-[160px]"></div>
                            <TableSkeleton cols={cols} rows={5} />
                            <PaginationSkeleton />
                        </div>
                    ) : data && (
                        <div className="p-4 space-y-5 rounded-[14px] bg-white">
                            <h4 className="font-semibold text-text">Resultado de búsqueda</h4>
                            <Table cols={cols} data={data.items.map(i => ({
                                ID: i.nodeId,
                                Archivo: i.originalName,
                                Propietario: i.createdBy,
                                "Fecha y hora": i.created
                            }))} actions={actions} />
                            <Pagination
                                page={paginate.page}
                                pageSize={paginate.pageSize}
                                totalCount={data.totalCount}
                                hasNextPage={data.hasNextPage}
                                hasPreviousPage={data.hasPreviousPage}
                                onPageChange={(page: number) => {
                                    setPaginate(v => ({ ...v, page }))
                                }}
                            />
                        </div>
                    )}

                </div>
            </div>
        </Dashboard>
    )
}

export default MemosContainer;