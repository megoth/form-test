import {NavLink, Outlet} from "react-router";
import {Heading} from "@digdir/designsystemet-react";
import {FormModelProvider} from "../hooks/formModel/provider";
import SubmittedDataViewer from "./SubmittedDataViewer";

export default function Layout() {
    return (
        <FormModelProvider>
            <header>
                <div className="container">
                    <Heading level={1}>Testing React Form Hook and Zod</Heading>
                </div>
            </header>
            <nav className="main-navigation">
                <div className="container">
                    <NavLink to="/">Simple form</NavLink>
                    <NavLink to="/complex">Complex form</NavLink>
                    <NavLink to="/zod">Form w/Zod</NavLink>
                </div>
            </nav>
            <main>
                <div className="container">
                    <Outlet/>
                </div>
            </main>
            <aside>
                <div className="container">
                    <SubmittedDataViewer/>
                </div>
            </aside>
            <footer>
                <div className="container">
                    Code available at <a href="https://github.com/megoth/form-test">GitHub</a>
                </div>
            </footer>
        </FormModelProvider>
    )
}