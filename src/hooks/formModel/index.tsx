import {useContext} from "react";
import FormModelContext from "./context";

export default function useFormModel() {
    return useContext(FormModelContext);
}
