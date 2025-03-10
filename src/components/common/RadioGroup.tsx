import React from 'react';
import clsx from 'clsx';

type RadioOption = {
    label: string;
    value: any;
};

type Props = {
    name: string;
    options: RadioOption[];
    value: any;
    error: boolean;
    onChange: (value: any) => void;
    onBlur: () => void;
};

const RadioGroup: React.FC<Props> = ({ name, options, value, error, onChange, onBlur }) => {

    return (
        <div className="flex gap-5 items-center">
            {options.map((option, index) => (
                <label key={index} htmlFor={`${name}-${index}`} className="flex items-center gap-[5px]">
                    <span>{option.label}</span>
                    <input
                        className={clsx(
                            "size-6 appearance-none rounded-full checked:bg-secn-blue bg-clip-padding bg-[#F5F7F9] ring-1 ring-[#D1D1D1] outline-none",
                            error ? "ring-red-500" : ""
                        )}
                        type="radio"
                        name={name}
                        id={`${name}-${index}`}
                        checked={value == option.value}
                        onChange={() => onChange(option.value)}
                        onBlur={onBlur}
                    />
                </label>
            ))}
        </div>
    );
};

export default RadioGroup;