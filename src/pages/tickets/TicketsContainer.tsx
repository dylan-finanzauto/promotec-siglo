import { useState } from "react";
import SupportForm from "./forms/FormSupport";
import { useStore } from "../../store/user";
import Dashboard from "../../layouts/Dashboard";
import StepsBar from "../../components/ui/StepsBar";
import FormTicket from "./forms/FormTicket";

const steps = ["Info. Reclamo", "Soportes"];

const TicketsContainer: React.FC = () => {

    const [step, setStep] = useState(0)
    const user = useStore((state) => state.user)

    const handleSave = () => {
        setStep(1)
    }

    const handleCreate = () => {
    }

    return (
        <Dashboard>
            <div className="flex flex-col gap-2">
                <h1 className="font-bold text-2xl text-text">
                    Bienvenid@, {`${user.name} ${user.lastName}`}
                </h1>
                <p className="text-sm text-text2">
                    Esta es la información que tenemos para mostrarte
                </p>

                <StepsBar steps={steps} currentStep={step} />
                {step == 0 ? (
                    <FormTicket onSave={handleSave} />
                ) : (
                    <SupportForm onBack={() => setStep(0)} onCreate={handleCreate} />
                )}

            </div>
        </Dashboard>
    )
}

export default TicketsContainer;