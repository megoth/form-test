import {createContext} from "react";

interface FormModel {
    data: Record<string, unknown> | null;
    setData: (data: Record<string, unknown> | null) => void;
}

const FormModelContext = createContext<FormModel>({data: null, setData: () => null});

export default FormModelContext;