import { useEffect, useState } from "react";
import Wrapper from "../../layouts/Wrapper";
// import { useStore } from "../../store/user";
import PromotecIcon from "../common/icons/PromotecIcon"
import NotificationContainer from "./NotificationContainer";

const Header: React.FC = () => {

    // const { user } = useStore((state) => state);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000); // Actualiza cada minuto (60000 ms)

        // Limpia el intervalo cuando el componente se desmonta
        return () => clearInterval(intervalId);
    }, []);

    return (
        <header className="bg-secn-blue relative z-20">
            <Wrapper className="h-24 flex justify-between py-5 items-center">
                <PromotecIcon className="text-white" />
                <div className="flex gap-4">
                    <NotificationContainer />
                    <div
                        className="grid place-items-center rounded-full h-12 bg-[#3155A3] px-8 text-white"
                    >
                        {/* <h4>{formatearFecha(user.lastConnecction)}</h4> */}
                        <h4>{currentTime.toLocaleString()}</h4>
                    </div>
                </div>
            </Wrapper>
        </header>
    )
}

export default Header;