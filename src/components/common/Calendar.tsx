import React, { useEffect, useRef, useState } from 'react';
import CalendarIcon from "./icons/CalendarIcon";
import ChevronLeftIcon from "./icons/ChevronLeftIcon";
import ChevronRightIcon from "./icons/ChevronRightIcon";
import clsx from 'clsx';

type Props = {
    className?: string;
    name: string;
    value: Date | null;
    error: boolean;
    onChange: (value: Date) => void;
    onBlur: () => void;
};

const Days = ["D", "L", "M", "M", "J", "V", "S"];

const Calendar: React.FC<Props> = ({ className, name, value, error, onChange, onBlur }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isFocus, setIsFocus] = useState(false);
    const [actionPosition, setActionPosition] = useState<{ top?: number; left?: number; bottom?: number } | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !(containerRef.current as Element).contains(event.target as Node)) {
                setIsFocus(false);
                onBlur();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onBlur]);

    useEffect(() => {
        const rect = calendarRef.current?.getBoundingClientRect();
        if (rect) {
            const windowHeight = window.innerHeight;
            const dropdownHeight = 345;
            const spaceBelow = windowHeight - rect.bottom;
            const spaceAbove = rect.top;

            if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
                setActionPosition({ top: rect.top + window.scrollY - dropdownHeight, left: rect.left + window.scrollX });
            } else {
                setActionPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
            }
        }
    }, [isFocus]);

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleDayClick = (day: number) => {
        const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        onChange(selectedDate);
        setIsFocus(false);
    };

    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year: number, month: number) => {
        return new Date(year, month, 1).getDay();
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const daysArray = Array.from({ length: 42 }, (_, i) => {
        const day = i - firstDayOfMonth + 1;
        return day > 0 && day <= daysInMonth ? day : null;
    });

    return (
        <div className="" ref={containerRef}>
            <div className={clsx("p-3 flex items-center [&_*]:pointer-events-none gap-4 border border-[#DEE5ED] rounded-lg", className, isFocus ? "outline-2 outline-secn-blue" : "", error ? "border-red-500" : "")} onClick={() => setIsFocus(true)} ref={calendarRef}>
                <CalendarIcon className="text-[#1F2024]" />
                <span className="text-sm text-[#1F2024]">{value ? value.toLocaleDateString() : 'dd/mm/aaaa'}</span>
            </div>
            {isFocus && actionPosition && (
                <div className="absolute z-20 mt-2 p-5 border border-[#DEE5ED] shadow-lg bg-white rounded-lg"
                    style={{ top: actionPosition.top, left: actionPosition.left }}
                >
                    <div className="py-4 flex items-center">
                        <button onClick={handlePrevMonth} className="size-8 rounded-lg grid place-items-center border border-[#DEE5ED] cursor-pointer">
                            <ChevronLeftIcon className="text-[#7C93B5]" />
                        </button>
                        <h4 className="flex-1 text-center font-bold">{currentDate.toLocaleString('default', { month: 'short' })} {year}</h4>
                        <button onClick={handleNextMonth} className="size-8 rounded-lg grid place-items-center border border-[#DEE5ED] cursor-pointer">
                            <ChevronRightIcon className="text-[#7C93B5]" />
                        </button>
                    </div>

                    <div className="grid grid-cols-[repeat(7,32px)] grid-rows-[repeat(6,32px)] gap-1">
                        {Days.map((day, i) => (
                            <div key={i} className="grid place-items-center text-secn-blue font-bold">
                                {day}
                            </div>
                        ))}

                        {daysArray.map((day, i) => {
                            return day !== null ? (
                                <div
                                    key={i}
                                    className={`grid place-items-center text-[#444444] rounded-lg cursor-pointer ${value && value.getDate() === day && value.getMonth() === month && value.getFullYear() === year ? 'bg-secn-blue text-white' : 'hover:bg-[#E5F3FF]'}`}
                                    onClick={() => handleDayClick(day)}
                                >
                                    {day}
                                </div>
                            ) : (
                                <div key={i}></div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;