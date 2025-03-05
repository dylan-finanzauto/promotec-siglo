import TicketForm from "./forms/FormTicket";
import { useState } from "react";
import SupportForm from "./forms/FormSupport";
import { useStore } from "../../store/user";
import Dashboard from "../../layouts/Dashboard";
import StepsBar from "../../components/ui/StepsBar";

const steps = ["Info. Reclamo", "Soportes"];

const TicketsContainer: React.FC = () => {
    const user = useStore((state) => state.user)
    const [step, setStep] = useState(0)

    return (
        <Dashboard>
            <div className="flex flex-col gap-2">
                <h1 className="font-bold text-2xl text-text">
                    Bienvenida, {`${user.name} ${user.lastName}`}
                </h1>
                <p className="text-sm text-text2">
                    Esta es la información que tenemos para mostrarte
                </p>

                <StepsBar steps={steps} currentStep={step} />
                {step == 0 ? (
                    <TicketForm onNext={() => setStep(1)} />
                ) : (
                    <SupportForm onBack={() => setStep(0)} onNext={() => { }} />
                )}


            </div>
        </Dashboard>
    )
}

export default TicketsContainer;