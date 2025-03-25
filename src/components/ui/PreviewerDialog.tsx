import Dialog from "./Dialog"
import XIcon from "../common/icons/XIcon"

type Props = {
    title: string;
    mediaType: string;
    b64: string;
    isOpen: boolean;
    onClose: () => void
}

const PreviewerDialog: React.FC<Props> = ({ title, mediaType, b64, isOpen, onClose }) => {

    // const [isOpen, setIsOpen] = useState(true)

    return (
        <Dialog isOpen={isOpen}>
            <div className="rounded-2xl bg-white p-8 w-5xl min-w-0 relative max-h-[calc(100vh-20px)]">
                <div className="space-y-6 flex flex-col h-full overflow-hidden">
                    <button className="size-10 grid place-items-center absolute top-0 right-0 mt-6 mr-6 cursor-pointer" onClick={() => onClose()}>
                        <XIcon className="size-4" />
                    </button>
                    <h2 className="text-2xl font-semibold">{title}</h2>
                    <p className="text-sm">Visualice el documento seleccionado.</p>
                    <object data={`data:${mediaType};base64,${b64}`} type={mediaType} width="100%" height="769px" className="min-h-0 grow object-cover"></object>
                </div>
            </div>
        </Dialog>
    )
}

export default PreviewerDialog;