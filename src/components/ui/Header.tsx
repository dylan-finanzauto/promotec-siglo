import Wrapper from "../../layouts/Wrapper";
import { useStore } from "../../store/user";
import { formatearFecha } from "../../util/date";
import PromotecIcon from "../common/icons/PromotecIcon"
import NotificationContainer from "./NotificationContainer";

const Header: React.FC = () => {

    const { user } = useStore((state) => state);

    return (
        <header className="bg-secn-blue relative z-20">
            <Wrapper className="h-24 flex justify-between py-5 items-center">
                <PromotecIcon className="text-white" />
                <div className="flex gap-4">
                    <NotificationContainer />
                    <div
                        className="grid place-items-center rounded-full h-12 bg-[#3155A3] px-8 text-white"
                    >
                        <h4>{formatearFecha(user.lastConnecction)}</h4>
                    </div>
                </div>
            </Wrapper>
        </header>
    )
}

export default Header;