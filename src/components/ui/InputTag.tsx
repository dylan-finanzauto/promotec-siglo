import React, { useEffect, useMemo, useRef, useState } from "react";

interface Email {
    key: any;
    value: any;
}

type Props = {
    emails: Email[];
    value: string[];
    error: boolean;
    onChange: (emails: string[]) => void;
    onBlur: () => void;
};

const InputTag: React.FC<Props> = ({ emails, value, error, onChange, onBlur }) => {
    const [onFocus, setOnFocus] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !(containerRef.current as Element).contains(event.target as Node)) {
                setOnFocus(false);
                onBlur();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onBlur]);

    const filteredEmails = useMemo(() => emails.filter((e) => !value.includes(e.value)).filter(e => e.value.startsWith(inputValue)), [value, inputValue]);

    const handleSelect = (email: Email) => {
        onChange([...value, email.value]);
        setOnFocus(false);
        setInputValue('');
    };

    const handleDelete = (emailValue: string) => {
        onChange(value.filter((e) => e !== emailValue));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="space-y-2">
            <div className="relative w-sm" ref={containerRef}>
                <input
                    className={`bg-white w-full p-2 rounded-lg border ${error ? 'border-red-500' : 'border-[#DEE5ED]'} outline-none`}
                    onClick={() => setOnFocus(true)}
                    onChange={handleChange}
                    value={inputValue}
                    autoComplete="none"
                    type="text"
                />
                {onFocus && (
                    <ul className="absolute w-full max-h-[248px] overflow-y-auto rounded-lg py-2 bg-white border border-[#DEE5ED] mt-1 z-10 shadow-lg">
                        {filteredEmails.map(i => (
                            <li key={i.value} className="py-3 px-4 hover:bg-white2 cursor-pointer" onClick={() => handleSelect(i)}>{i.value}</li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="flex gap-2 overflow-x-auto scroll-hidden">
                {value.map((emailValue, index) => {
                    const email = emails.find(e => e.value === emailValue);
                    return (
                        <div key={index} className="flex items-center bg-princ-blue text-secn-blue rounded-sm">
                            <span className="py-1 px-2">{email?.value}</span>
                            <button className="cursor-pointer outline-none pr-2" onClick={() => handleDelete(emailValue)}>X</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default InputTag;