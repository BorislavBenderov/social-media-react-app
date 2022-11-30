import { Outlet } from "react-router-dom"
import { Header } from "../header/Header"

export const HeaderLayout = ({ children }) => {
    return (
        <>
            <Header />
            <Outlet>
                {children}
            </Outlet>
        </>
    );
}