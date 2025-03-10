import React from 'react';
import clsx from 'clsx';
import AnglesIcon from "../common/icons/AnglesIcon";

type Props = {
    name: string;
    value: string;
    error: boolean;
    onChange: (value: string) => void;
    onBlur: () => void;
    placeholder?: string;
};

const TextareaField: React.FC<Props> = ({ name, value, error, onChange, onBlur, placeholder }) => {
    return (
        <div className="relative">
            <AnglesIcon className="absolute left-0 top-0 mt-3 ml-3 text-[#7C93B5] pointer-events-none" />
            <textarea
                className={clsx(
                    "w-full px-8 py-[10px] rounded-lg outline-none bg-white border min-h-24 text-sm text-[#7C93B5]",
                    error ? "border-red-500" : "border-[#DEE5ED]"
                )}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
            />
            <AnglesIcon className="absolute right-0 top-0 mt-3 mr-3 text-[#7C93B5] pointer-events-none" />
        </div>
    );
};

export default TextareaField;