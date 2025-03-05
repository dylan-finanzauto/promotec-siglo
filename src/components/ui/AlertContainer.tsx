import InfoCircleIcon from "../common/icons/InfoCircleIcon"
import AlertIcon from "../common/icons/AlertIcon"
import CheckCircleIcon from "../common/icons/CheckCircleIcon"
import { useAlert } from "../../hooks/useAlert";

const icons = {
    success: (<div className="shrink-0 size-16 rounded-full grid place-items-center bg-princ-blue"><CheckCircleIcon className="text-secn-blue size-8" /></div>),
    error: (<div className="shrink-0 size-16 rounded-full grid place-items-center bg-[#FFDADA]"><AlertIcon className="text-[#ED2D15] size-8" /></div>),
    warning: (<div className="shrink-0 size-16 rounded-full grid place-items-center bg-[#feffda]"><AlertIcon className="text-yellow-500 size-8" /></div>),
    info: (<div className="shrink-0 size-16 rounded-full grid place-items-center bg-princ-blue"><InfoCircleIcon className="text-secn-blue size-8" /></div>),
};

const AlertContainer: React.FC = () => {

    const { alerts, removeAlert } = useAlert()

    return (
        <>
            {alerts.length > 0 && (
                <>
                    <div className="fixed inset-0 z-50 bg-[#000C3E]/50 backdrop-blur-sm"></div>

                    {alerts.map(a => (
                        <div className="fixed left-[50%] top-[50%] z-50 grid w-min max-w-7xl translate-x-[-50%] translate-y-[-50%] shadow-lg bg-white rounded-2xl overflow-hidden" key={a.id}>
                            <div className="w-xl">
                                <div className="pt-10 px-8 pb-8 flex gap-8">
                                    {icons[a.status]}
                                    <div className="space-y-4">
                                        <h2 className="text-xl text-secn-blue font-bold">{a.title}</h2>
                                        <p className="text-text">{a.description}</p>
                                    </div>
                                </div>
                                <div className="p-8 flex justify-end bg-gray1">
                                    <button className="h-10 w-[250px] rounded-[10px] bg-tirth text-white cursor-pointer" onClick={() => {
                                        removeAlert(a.id)
                                    }}>Aceptar</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </>
    )
}

export default AlertContainer;