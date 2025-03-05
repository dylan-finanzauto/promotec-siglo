import React, { useEffect, useMemo, useRef, useState } from "react"

interface Email {
    key: any,
    value: any
}

type Props = {
    emails: Email[]
}

const InputTag: React.FC<Props> = ({ emails }) => {

    const [onFocus, setOnFocus] = useState(false)
    const [inputValue, setInputValue] = useState('')

    const [taggedEmails, setTaggedEmails] = useState<Email[]>([])

    const containerRef = useRef(null)

    useEffect(() => {
        console.log("Tagged: ", taggedEmails)
    }, [taggedEmails])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !(containerRef.current as Element).contains(event.target as Node)) {
                setOnFocus(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const filteredEmails = useMemo(() => emails.filter((e) => !taggedEmails.includes(e)).filter(e => e.key.startsWith(inputValue)), [taggedEmails, inputValue])

    const handleSelect = (email: Email) => {
        setTaggedEmails([...taggedEmails, email])
        setOnFocus(false)
        setInputValue('')
    }

    const handleDelete = (email: Email) => {
        setTaggedEmails(taggedEmails.filter((e) => e !== email))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    return (
        <>
            <div className="space-y-2">
                <div className="relative w-sm" ref={containerRef}>
                    <input className="bg-white w-full p-2 rounded-lg border border-[#DEE5ED] outline-none" onClick={() => setOnFocus(true)} onChange={handleChange} value={inputValue} autoComplete="none" type="text" name="" id="" />
                    {onFocus && (
                        <ul className="absolute w-full max-h-[248px] overflow-y-auto rounded-lg py-2 bg-white border border-[#DEE5ED] mt-1 z-10 shadow-lg">
                            {filteredEmails.map(i => (
                                <li key={i.value} className="py-3 px-4 hover:bg-white2 cursor-pointer" onClick={() => handleSelect(i)}>{i.key}</li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="flex gap-2 overflow-x-auto scroll-hidden">
                    {taggedEmails.map((email, index) => {
                        return (
                            <div key={index} className="flex items-center bg-princ-blue text-secn-blue rounded-sm">
                                <span className="py-1 px-2">{email.key}</span>
                                <button className="cursor-pointer outline-none pr-2" onClick={() => handleDelete(email)}>X</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default InputTag;