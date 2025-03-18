import ChevronLeftDoubleIcon from "./icons/ChevronLeftDoubleIcon";
import ChevronLeftIcon from "./icons/ChevronLeftIcon";
import ChevronRightDoubleIcon from "./icons/ChevronRightDoubleIcon";
import ChevronRightIcon from "./icons/ChevronRightIcon";

type Props = {
    page: number;
    pageSize: number;
    totalCount: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    onPageChange: (page: number) => void;
};

const Pagination: React.FC<Props> = ({ page, pageSize, totalCount, hasNextPage, hasPreviousPage, onPageChange }) => {
    const totalPages = Math.ceil(totalCount / pageSize);

    return (
        <div className="flex gap-4 items-center">
            <div className="grow text-[#7C93B5] text-sm">{`${(page - 1) * pageSize + 1}-${Math.min(page * pageSize, totalCount)} de ${totalCount} registros`}</div>
            <div className="flex items-center gap-2">
                <div className="">Registros mostrados</div>
                <div className="size-10 bg-white border border-[#DEE5ED] grid place-items-center rounded-lg">{pageSize}</div>
            </div>
            <div className="">{`Página ${page} de ${totalPages}`}</div>
            <div className="flex gap-2">
                <button
                    className="size-10 grid place-items-center border border-[#DEE5ED] disabled:text-princ-blue rounded-lg cursor-pointer disabled:cursor-auto"
                    onClick={() => onPageChange(1)}
                    disabled={!hasPreviousPage}
                >
                    <ChevronLeftDoubleIcon />
                </button>
                <button
                    className="size-10 grid place-items-center border border-[#DEE5ED] disabled:text-princ-blue rounded-lg cursor-pointer disabled:cursor-auto"
                    onClick={() => onPageChange(page - 1)}
                    disabled={!hasPreviousPage}
                >
                    <ChevronLeftIcon />
                </button>
                <button
                    className="size-10 grid place-items-center border border-[#DEE5ED] disabled:text-princ-blue rounded-lg cursor-pointer disabled:cursor-auto"
                    onClick={() => onPageChange(page + 1)}
                    disabled={!hasNextPage}
                >
                    <ChevronRightIcon />
                </button>
                <button
                    className="size-10 grid place-items-center border border-[#DEE5ED] disabled:text-princ-blue rounded-lg cursor-pointer disabled:cursor-auto"
                    onClick={() => onPageChange(totalPages)}
                    disabled={!hasNextPage}
                >
                    <ChevronRightDoubleIcon />
                </button>
            </div>
        </div>
    );
};

export default Pagination;