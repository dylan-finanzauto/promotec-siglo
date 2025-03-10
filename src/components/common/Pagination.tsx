import ChevronLeftDoubleIcon from "./icons/ChevronLeftDoubleIcon";
import ChevronLeftIcon from "./icons/ChevronLeftIcon";
import ChevronRightDoubleIcon from "./icons/ChevronRightDoubleIcon";
import ChevronRightIcon from "./icons/ChevronRightIcon";

type Props = {}

const Pagination: React.FC<Props> = () => {
    return (
        <>
            <div className="flex gap-4 items-center">
                <div className="grow text-[#7C93B5] text-sm">1-10 de 100 registros</div>
                <div className="flex items-center gap-2">
                    <div className="">Registros mostrados</div>
                    <div className="size-10 bg-white border border-[#DEE5ED] grid place-items-center rounded-lg">10</div>
                </div>
                <div className="">Página 1 de 10</div>
                <div className="flex gap-2">
                    <button className="size-10 grid place-items-center border border-[#DEE5ED] rounded-lg cursor-pointer">
                        <ChevronLeftDoubleIcon />
                    </button>
                    <button className="size-10 grid place-items-center border border-[#DEE5ED] rounded-lg cursor-pointer">
                        <ChevronLeftIcon />
                    </button>
                    <button className="size-10 grid place-items-center border border-[#DEE5ED] rounded-lg cursor-pointer">
                        <ChevronRightIcon />
                    </button>
                    <button className="size-10 grid place-items-center border border-[#DEE5ED] rounded-lg cursor-pointer">
                        <ChevronRightDoubleIcon />
                    </button>
                </div>
            </div>
        </>
    )
}

export default Pagination;