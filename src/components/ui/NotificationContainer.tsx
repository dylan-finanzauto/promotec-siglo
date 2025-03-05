import React, { useEffect, useMemo, useRef, useState } from "react"
import BellIcon from "../common/icons/BellIcon";
import Notification from "./Notification";
import { getTiempoRelativo } from "../../util/date";

const notificaciones = [
    { id: 1, titulo: "Ingreso de PQR", mensaje: "La petición 23422 se le ha asignado.", fecha: "2025-03-04 12:02:00", hora: "12:00pm" },
    { id: 2, titulo: "Ingreso de PQR", mensaje: "La petición 23423 se le ha asignado.", fecha: "2025-03-03 00:00:00", hora: "9:00am" },
    { id: 3, titulo: "Ingreso de PQR", mensaje: "La petición 23424 se le ha asignado.", fecha: "2025-03-04 12:02:00", hora: "1:00pm" }
];

type Props = {}

const NotificationContainer: React.FC<Props> = () => {
    const [isFocus, setIsFocus] = useState(false);
    const [notifications, setNotifications] = useState(notificaciones)
    const notificationsByDate = useMemo(() => {
        return notifications.reduce<Record<string, typeof notifications>>((acc, noti) => {
            if (!acc[noti.fecha]) {
                acc[noti.fecha] = [];
            }
            acc[noti.fecha].push(noti);
            return acc;
        }, {})
    }, [notifications])
    const containerRef = useRef(null);

    const toggleClick = () => setIsFocus(v => !v)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !(containerRef.current as Element).contains(event.target as Node)) {
                setIsFocus(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [])

    const handleDelete = (notification: Notification) => {
        setNotifications((val) => val.filter(n => n.id !== notification.id))
    }

    return (
        <div className="relative" ref={containerRef}>
            <div
                className="grid place-items-center rounded-full size-12 bg-[#3155A3] cursor-pointer outline-2 outline-transparent hover:outline-tirth"
                onClick={toggleClick}
            >
                <BellIcon className="size-5 text-white" />
                <div
                    className="absolute size-4 text-[10px] grid place-items-center top-0 right-0 mt-[5px] mr-[5px] rounded-full text-white bg- truncate bg-tirth"
                >
                    {notifications.length}
                </div>
            </div>

            {isFocus && (
                <div className="absolute z-20 top-0 mt-4 right-0 mr-1 mb-8 bg-white border border-[#DEE5ED] p-4 rounded-lg w-sm space-y-4 shadow-lg">
                    <h3 className="font-semibold">Notificaciones {`(${notifications.length})`}</h3>
                    <div className="flex flex-col gap-4 max-h-[600px] overflow-auto pr-4">
                        {Object.entries(notificationsByDate).map(([fecha, items]) => (
                            <div className="space-y-4" key={fecha}>
                                <h5 className="text-[#7C93B5] font-semibold text-xs">{getTiempoRelativo(fecha)}</h5>

                                {items.map((n, i) => (
                                    <React.Fragment key={i}>
                                        <Notification notification={n} onDelete={handleDelete} />

                                        {i < (items.length - 1) && (
                                            <span className="block h-[1px] w-full bg-[#DEE5ED]"></span>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    )
}

export default NotificationContainer;