import React from "react";
import TrashIcon from "../common/icons/TrashIcon";

interface Notification {
    id: number;
    titulo: string;
    mensaje: string;
    hora: string;
}

type Props = {
    notification: Notification,
    onDelete: (notification: Notification) => void
}

const Notification: React.FC<Props> = ({ notification, onDelete }) => {

    return (
        <>
            <div className="group p-4 flex items-center gap-4 border-l-[3px] border-[#0020A8] rounded-sm hover:bg-[#DEE5ED] transition">
                <div className="space-y-1 flex-1">
                    <h6 className="text-sm font-semibold">{notification.titulo}</h6>
                    <p className="text-sm">{notification.mensaje}</p>
                    <p className="text-xs text-end">{notification.hora}</p>
                </div>
                <TrashIcon className="size-4 text-[#7C93B5] group-hover:text-black cursor-pointer" onClick={() => onDelete(notification)} />
            </div>
        </>
    )
}

export default Notification;
