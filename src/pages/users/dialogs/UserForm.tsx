import React from "react";
import CheckCircleIcon from "../../../components/common/icons/CheckCircleIcon";
import AlertIcon from "../../../components/common/icons/AlertIcon";
import InfoCircleIcon from "../../../components/common/icons/InfoCircleIcon";
import Select from "../../../components/common/Select";

const icons = {
    success: (<div className="shrink-0 size-16 rounded-full grid place-items-center bg-princ-blue"><CheckCircleIcon className="text-secn-blue size-8" /></div>),
    error: (<div className="shrink-0 size-16 rounded-full grid place-items-center bg-[#FFDADA]"><AlertIcon className="text-[#ED2D15] size-8" /></div>),
    warning: (<div className="shrink-0 size-16 rounded-full grid place-items-center bg-[#feffda]"><AlertIcon className="text-yellow-500 size-8" /></div>),
    info: (<div className="shrink-0 size-16 rounded-full grid place-items-center bg-princ-blue"><InfoCircleIcon className="text-secn-blue size-8" /></div>),
};

type Props = {
    onCreate: () => void,
    onCancel: () => void
}

const UserForm: React.FC<Props> = ({ onCreate, onCancel }) => {
    return (
        <>
            <div className="fixed inset-0 z-50 bg-[#000C3E]/50 backdrop-blur-sm"></div>
            <div className="fixed left-[50%] top-[50%] z-50 grid w-min max-w-7xl translate-x-[-50%] translate-y-[-50%] shadow-lg bg-white rounded-2xl overflow-hidden">
                <div className="">
                    <div className="pt-10 px-8 pb-8 flex gap-8">
                        {icons.success}
                        <div className="space-y-4 w-lg">
                            <h2 className="text-3xl text-secn-blue font-bold">Crear nuevo usuario</h2>
                            <div className="space-y-4 w-sm">
                                <div className="flex flex-col gap-1">
                                    <label className="text-[#2F3036] text-xs font-semibold"
                                    >Nombre usuario</label>
                                    <input
                                        className="h-10 border border-[#DEE5ED] rounded-lg px-3 py-[10px] outline-secn-blue"
                                        type="text"
                                        name=""
                                        id=""
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-[#2F3036] text-xs font-semibold"
                                    >Rol</label>
                                    <Select items={[]} />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-[#2F3036] text-xs font-semibold"
                                    >Correo electrónico</label>
                                    <input
                                        className="h-10 border border-[#DEE5ED] rounded-lg px-3 py-[10px] outline-secn-blue"
                                        type="text"
                                        name=""
                                        id=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-8 flex justify-end gap-4 bg-gray1">
                        <button className="h-10 px-20 rounded-[10px] bg-white border border-tirth text-tirth cursor-pointer" onClick={() => { onCancel() }}>Cancelar</button>
                        <button className="h-10 px-20 rounded-[10px] bg-tirth text-white cursor-pointer" onClick={() => { onCreate() }}>Crear</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserForm;