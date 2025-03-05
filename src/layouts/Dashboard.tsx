import type React from "react"
import Wrapper from "./Wrapper"
import Header from "../components/ui/Header"
import Sidebar from "../components/ui/Sidebar"

type Props = {
    children: React.ReactNode
}

const Dashboard: React.FC<Props> = ({ children }) => {

    return (
        <div
            className="grid grid-cols-1 grid-rows-[96px_1fr] min-h-screen bg-[#F0F2F9]"
        >
            <div className="col-span-2">
                <Header />
            </div>

            <Wrapper>
                <div className="grid grid-cols-[280px_1fr] gap-5 h-full">
                    {<Sidebar />}
                    <main className="pt-5 pb-12 overflow-hidden">
                        {children}
                    </main>
                </div>
            </Wrapper>
        </div>
    )
}

export default Dashboard;