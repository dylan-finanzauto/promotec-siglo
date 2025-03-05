import React from "react";
import DownloadIcon from "../common/icons/DownloadIcon";
import clsx from "clsx";

export type CommentType = {
    title: string,
    text: string,
    attachs: string[],
    addedBy: string,
    date: string,
    isResponse: boolean,
}

type Props = {
    comment: CommentType
}

const Comment: React.FC<Props> = ({ comment }) => {
    return (
        <>
            <div className={clsx("space-y-1 py-4 flex flex-col", comment.isResponse ? "items-end" : "")}>
                <h4 className="font-semibold text-sm text-secn-blue">{comment.title}</h4>
                <p className={clsx("text-xs text-text", comment.isResponse ? "text-end" : "")}>{comment.text}</p>
                <div className="flex gap-2">
                    {comment.attachs.map((a) => (
                        <span className="inline-flex items-center rounded bg-[#E7ECF2] text-black p-2 gap-1 cursor-pointer">
                            <span className="text-[10px] font-semibold">{a}</span>
                            <DownloadIcon />
                        </span>
                    ))}
                </div>
                <p className="text-text2 text-xs">Agregado por {comment.addedBy} el {comment.date}</p>
            </div>
        </>
    )
}

export default Comment;