import {createContext} from "react";

interface FormModel {
    data: Record<string, unknown> | null;
    post: (url: string, data: Record<string, unknown>) => Promise<void>;
    response: Response | null;
    setData: (data: Record<string, unknown> | null) => void;
    setResponse: (response: Response | null) => void;
}

const FormModelContext = createContext<FormModel>({
    data: null,
    post: () => new Promise((resolve) => resolve()),
    response: null,
    setData: () => null,
    setResponse: () => null
});

export default FormModelContext;