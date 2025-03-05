import React from "react";
import ClipIcon from "../../../components/common/icons/ClipIcon";
import Comment, { CommentType } from "../../../components/ui/Comment";
import clsx from "clsx";

const comments: CommentType[] = [
    {
        title: "Respuesta",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        addedBy: "LOS COCHES",
        attachs: [],
        date: "30/06/2024",
        isResponse: false,
    },
    {
        title: "Respuesta",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        addedBy: "CALIDAD TRAVESA AL DÍA",
        attachs: [
            "DOCUMENTO 1.DOCX",
            "DOCUMENTO 1.DOCX",
        ],
        date: "30/06/2024",
        isResponse: false,
    },
    {
        title: "Respuesta",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
        addedBy: "Daniela Latorre",
        attachs: [
            "DOCUMENTO 1.DOCX",
        ],
        date: "30/06/2024",
        isResponse: true,
    },
]

type Props = {}

const FormComments: React.FC<Props> = () => {
    return (
        <>
            <h3 className="text-xl text-text font-bold">Información</h3>
            <div className="space-y-4">
                <h4 className="text-secn-blue font-bold">Resumen de comentarios</h4>
                <div className="p-4 rounded-xl border border-[#DEE5ED]">
                    {comments.map((c, i) => (
                        <div className="grid grid-cols-[16px_1fr] gap-4" key={i}>
                            <div className="flex flex-col items-center">
                                <span className={clsx("w-[2px] h-4", i != 0 ? "bg-secn-blue" : "")}></span>
                                <span className="size-4 bg-secn-blue rounded-full shrink-0"></span>
                                {!(i == comments.length - 1) && (
                                    <span className="w-[2px] h-full bg-secn-blue"></span>
                                )}
                            </div>
                            <Comment comment={c} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="space-y-4">
                <h4 className="text-secn-blue font-bold">Agregar comentario de gestión</h4>
                <div className="flex flex-col gap-1">
                    <label className="text-[#2F3036] text-xs font-semibold"
                    >Comentario de gestión</label>
                    <textarea
                        className="w-full px-3 py-[10px] rounded-lg outline-none bg-white border border-[#DEE5ED] min-h-24 text-sm text-[#7C93B5]"
                        placeholder="Ingrese aquí su comentario"
                        name=""
                        id=""></textarea>
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <button className="border border-[#DEE5ED] rounded-lg grid place-items-center size-10 cursor-pointer">
                    <ClipIcon className="text-black" />
                </button>
                <button className="bg-tirth text-white flex items-center h-10 px-20 rounded-lg cursor-pointer">Enviar</button>
            </div>

        </>
    )
}

export default FormComments;