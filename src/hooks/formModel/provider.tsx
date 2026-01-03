import {type ReactNode, useEffect, useState} from "react";
import FormModelContext from "./context.tsx";
import {useLocation} from "react-router";

interface Props {
    children: ReactNode;
}

export function FormModelProvider({children}: Props) {
    const [data, setData] = useState<Record<string, unknown> | null>(null);
    const [response, setResponse] = useState<Response | null>(null);
    const location = useLocation();
    useEffect(() => {
        const timeoutId = setTimeout(() => setData(null));
        return () => clearTimeout(timeoutId);
    }, [setData, location.pathname]);
    const post = async (url: string, data: Record<string, unknown>) => {
        setResponse(await fetch(url, {method: "POST", body: JSON.stringify(data)}));
        setData(data);
    }
    return (
        <FormModelContext.Provider value={{data, post, response, setData, setResponse}}>
            {children}
        </FormModelContext.Provider>
    )
}