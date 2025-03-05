import { useEffect, useRef, useState } from "react"
import { User } from "../../types/User";
import { Role } from "../../types/Auth";

type Props = {
    user: User,
    role: Role,
    onExit: () => void
}

const SideUser: React.FC<Props> = ({ user, role, onExit }) => {

    const [isFocus, setIsFocus] = useState(false);
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

    return (
        <div className="fixed w-[280px] bottom-0 mb-5" ref={containerRef}>
            <div
                className="p-3 flex gap-2 rounded-[10px] hover:bg-[#EDEFF7] border border-transparent hover:border-princ-blue transition cursor-pointer"
                onClick={toggleClick}
            >
                {/* <img className="size-11 rounded-full" src={"/images/image11.png"} alt="" /> */}
                <span className="bg-secn-blue text-white size-11 rounded-full grid place-items-center">{`${user.name.charAt(0)}${user.lastName.charAt(0)}`}</span>
                <div className="w-32 space-y-1">
                    <h4 className="text-text2 font-bold text-[14px]">
                        {`${user.name} ${user.lastName}`}
                    </h4>
                    <span
                        className="py-1 px-4 rounded-sm uppercase bg-princ-blue text-[8px] text-text2"
                    >{role}</span>
                </div>
            </div>

            {isFocus && (

                <div className="absolute bottom-0 left-0 mb-8 bg-white border border-[#DEE5ED] p-2 rounded-lg w-xs">
                    <div className="grid gap-1">
                        <div className="p-2 space-y-1">
                            <div className="font-semibold">{user.name}</div>
                            <div className="text-[14px]">{user.email}</div>
                        </div>
                        <span className="block h-[1px] w-full bg-[#DEE5ED]"></span>
                        <button className="p-2 hover:bg-white2 rounded-lg cursor-pointer" onClick={onExit}>
                            <div className="">Cerrar Sesión</div>
                        </button>
                    </div>
                </div>
            )}

        </div>
    )
}

export default SideUser;