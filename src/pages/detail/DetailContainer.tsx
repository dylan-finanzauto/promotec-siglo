import React from "react";
import ChevronLeftIcon from "../../components/common/icons/ChevronLeftIcon";
import Main from "../../layouts/Main";
import { Link, useParams } from "@tanstack/react-router";
import FormNews from "./forms/FormNews";
import Resume from "./Resume";
import { TabContainer, Tab } from "../../components/ui/TabContainer";
import FormSupport from "./forms/FormSupports";
import FormComments from "./forms/FormComments";

type Props = {}

const DetailContainer: React.FC<Props> = () => {

    const { id } = useParams({ strict: false });

    return (
        <>
            <Main>
                <Resume />
                <div className="flex flex-col gap-5">
                    <div className="space-y-2">
                        <Link to={"/"}>
                            <div className="text-text inline-flex items-center gap-2 font-semibold">
                                <div className="size-10 grid place-items-center">
                                    <ChevronLeftIcon className="" />
                                </div>
                                <h4 className="text-2xl">Activos</h4>
                            </div>
                        </Link>
                        <div className="">
                            <span className="text-text2">Buscar/editar</span> <b>/</b> Detalle Siniestro {id}
                        </div>
                    </div>

                    <TabContainer>
                        <Tab title="Formulario novedades / reclamos">
                            <FormNews />
                        </Tab>
                        <Tab title="Soportes">
                            <FormSupport />
                        </Tab>
                        <Tab title="Histórico comentarios">
                            <FormComments />
                        </Tab>
                    </TabContainer>

                </div>

            </Main>
        </>
    )
}

export default DetailContainer;