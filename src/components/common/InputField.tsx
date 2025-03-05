import type { AnyFieldApi } from "@tanstack/react-form";
import clsx from "clsx";
import type React from "react";
import { useState } from "react";
import EyeIcon from "./icons/EyeIcon";
import EyeOffIcon from "./icons/EyeOffIcon";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    error: boolean
}

export const FieldInfo: React.FC<{ field: AnyFieldApi }> = ({ field }) => {
    return (
        <>
            {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <em className="text-red-500 text-sm">{field.state.meta.errors.join(',')}</em>
            ) : null}
            {/* {field.state.meta.isValidating ? 'Validating...' : null} */}
        </>
    )
}

export const InputField: React.FC<Props> = ({ className, type, error, ...props }) => {
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    return (
        <div className="relative flex">
            <input
                className={clsx("h-10 flex-1 border rounded-lg text-[#1F2024] px-3 py-[10px] shadow-sm transition-all", error ? "border-red-400 outline-red-500" : "border-[#DEE5ED] outline-secn-blue")}
                {...props}
                type={type === 'password' && passwordVisible ? 'text' : type}
            />

            {type === 'password' && <span className="absolute p-1 rounded-full hover:bg-white2 outline-none right-0 mr-4 top-1/2 -translate-y-1/2 cursor-pointer text-[#999999] transition-all" onClick={() => setPasswordVisible(!passwordVisible)}>
                {passwordVisible ? <EyeIcon /> : <EyeOffIcon />}
            </span>}

        </div>
    )
}
