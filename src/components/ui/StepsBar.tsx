import clsx from "clsx";
import CheckIcon from "../common/icons/CheckIcon";
import React from "react";

type Props = {
    steps: string[],
    currentStep: number
}

const StepsBar: React.FC<Props> = ({ steps, currentStep }) => {

    return (
        <div className="flex justify-center py-5 bg-[#E6E8F5] rounded-[14px]">
            <div className={`flex flex-wrap justify-center`}>
                {steps.map((step, index) => (
                    <React.Fragment key={index}>
                        <div className="flex flex-col items-center gap-4 w-[120px]">
                            <span className={clsx("size-10 rounded-full grid place-items-center", index <= currentStep ? "bg-tirth" : "bg-text3")}>
                                {currentStep > index ? <CheckIcon className="text-white" /> : currentStep == index ? <span className="size-4 bg-white rounded-full"></span> : <span className="size-7 bg-[#E6E8F5] rounded-full"></span>}
                            </span>
                            <h5 className={clsx(
                                "text-[14px] font-medium",
                                index <= currentStep ? "" : "text-text3",
                                index == currentStep ? "font-semibold" : ""
                            )}>{step}</h5>
                        </div>
                        {(index !== steps.length - 1) && (
                            <div className="relative w-[120px]">
                                <span
                                    className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 block w-[192px] h-[3px] bg-text3"
                                >
                                    <span className={clsx(
                                        "block bg-tirth h-[3px]",
                                        currentStep > index ? "w-full" : currentStep == index ? "w-1/2" : "w-0"
                                    )}></span>
                                </span>
                            </div>
                        )}

                    </React.Fragment>
                ))}
            </div>

        </div>

    )
}

export default StepsBar;