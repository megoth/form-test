import "@digdir/designsystemet-css";
import "@digdir/designsystemet-css/theme";
import "./main.css";
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router";
import SimpleForm from "./components/SimpleForm.tsx";
import Layout from "./components/Layout.tsx";
import ComplexForm from "./components/ComplexForm.tsx";
import ZodForm from "./components/zod/ZodForm.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        children: [
            {
                index: true,
                Component: SimpleForm
            },
            {
                path: "/complex",
                Component: ComplexForm
            },
            {
                path: "/zod",
                Component: ZodForm
            }
        ]
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>,
)
