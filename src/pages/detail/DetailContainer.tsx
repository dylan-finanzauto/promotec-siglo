import React, { useEffect } from "react";
import Main from "../../layouts/Main";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import FormNews from "./forms/FormNews";
import Resume from "./Resume";
import { TabContainer, Tab } from "../../components/ui/TabContainer";
import FormSupport from "./forms/FormSupports";
import FormComments from "./forms/FormComments";
import ChevronLeftFilledIcon from "../../components/common/icons/ChevronLeftFilledIcon";
import { useIdentifier } from "../../hooks/useIdentifier";

type Props = {}

const DetailContainer: React.FC<Props> = () => {

    const { id } = useParams({ strict: false });
    const { changeId } = useIdentifier()
    const navigate = useNavigate()

    useEffect(() => {
        if (id) changeId(id)
    }, [id])

    return (
        <>
            <Main>
                <Resume />
                <div className="flex flex-col gap-5">
                    <div className="space-y-2">
                        <Link to={"/options"}>
                            <div className="text-text inline-flex items-center gap-2 font-semibold">
                                <div className="size-10 grid place-items-center">
                                    <ChevronLeftFilledIcon className="" />
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
                            <FormNews onCancel={() => navigate({ to: '/options' })} />
                        </Tab>
                        <Tab title="Soportes">
                            <FormSupport onCancel={() => navigate({ to: '/options' })} />
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