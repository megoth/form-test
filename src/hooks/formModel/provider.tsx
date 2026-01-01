import {type ReactNode, useEffect, useState} from "react";
import FormModelContext from "./context.tsx";
import {useLocation} from "react-router";

interface Props {
    children: ReactNode;
}

export function FormModelProvider({children}: Props) {
    const [data, setData] = useState<Record<string, unknown> | null>(null);
    const location = useLocation();
    useEffect(() => {
        const timeoutId = setTimeout(() => setData(null));
        return () => clearTimeout(timeoutId);
    }, [setData, location.pathname]);
    return (
        <FormModelContext.Provider value={{data, setData}}>
            {children}
        </FormModelContext.Provider>
    )
}