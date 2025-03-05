import Dialog from "./Dialog"
import InfoCircleIcon from "../common/icons/InfoCircleIcon"
import AlertIcon from "../common/icons/AlertIcon"
import CheckCircleIcon from "../common/icons/CheckCircleIcon"

const icons = {
    success: (<div className="shrink-0 size-16 rounded-full grid place-items-center bg-princ-blue"><CheckCircleIcon className="text-secn-blue size-8" /></div>),
    error: (<div className="shrink-0 size-16 rounded-full grid place-items-center bg-[#FFDADA]"><AlertIcon className="text-[#ED2D15] size-8" /></div>),
    warning: (<div className="shrink-0 size-16 rounded-full grid place-items-center bg-[#feffda]"><AlertIcon className="text-yellow-500 size-8" /></div>),
    info: (<div className="shrink-0 size-16 rounded-full grid place-items-center bg-princ-blue"><InfoCircleIcon className="text-secn-blue size-8" /></div>),
};

type Props = {
    isOpen: boolean,
    title: string,
    description: string,
    status: "success" | "error" | "warning" | "info",
    onClose: () => void
}

const AlertDialog: React.FC<Props> = ({ isOpen, title, description, status, onClose }) => {

    return (
        <>
            <Dialog isOpen={isOpen}>
                <div className="w-xl">
                    <div className="pt-10 px-8 pb-8 flex gap-8">
                        {icons[status]}
                        <div className="space-y-4">
                            <h2 className="text-xl text-secn-blue font-bold">{title}</h2>
                            <p className="text-text">{description}</p>
                        </div>
                    </div>
                    <div className="p-8 flex justify-end bg-gray1">
                        <button className="h-10 w-[250px] rounded-[10px] bg-tirth text-white cursor-pointer" onClick={() => onClose()}>Aceptar</button>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default AlertDialog;