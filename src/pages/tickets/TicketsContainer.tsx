import { useState } from "react";
import SupportForm from "./forms/FormSupport";
import { useStore } from "../../store/user";
import Dashboard from "../../layouts/Dashboard";
import StepsBar from "../../components/ui/StepsBar";
import FormTicket from "./forms/FormTicket";

const steps = ["Info. Reclamo", "Soportes"];

const TicketsContainer: React.FC = () => {

    const [step, setStep] = useState(0)
    const [id, setId] = useState('5c39fffa-9fd9-48d6-ceac-08dd5fe5af42')
    const user = useStore((state) => state.user)

    const handleSave = (id: string) => {
        setStep(1)
        setId(id)
    }

    const handleCreate = () => {

    }

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
                    <FormTicket id={id} onSave={handleSave} />
                ) : (
                    <SupportForm id={id} onBack={() => setStep(0)} onCreate={handleCreate} />
                )}

            </div>
        </Dashboard>
    )
}

export default TicketsContainer;