import type {PersonData} from "../../types";
import type {FieldError, RegisterOptions, UseFormRegister} from "react-hook-form";
import {Field, Input, Label, ValidationMessage} from "@digdir/designsystemet-react";
import type {HTMLProps, ReactNode} from "react";

export interface ZodFormFieldProps extends HTMLProps<HTMLInputElement> {
    children?: ReactNode;
    label?: string;
    type: "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "month" | "number" | "password" | "radio" | "search" | "tel" | "text" | "time" | "url" | "week";
    placeholder: string;
    name: ValidFieldNames;
    register: UseFormRegister<PersonData>;
    error?: FieldError;
    registerOptions?: RegisterOptions<PersonData, ValidFieldNames>;
}

export type ValidFieldNames = "name" | "age";

const ZodFormField: React.FC<ZodFormFieldProps> = ({
                                                       children,
                                                       label,
                                                       type,
                                                       placeholder,
                                                       name,
                                                       register,
                                                       error,
                                                       registerOptions,
                                                       ...props
                                                   }) => (
    <Field>
        {children ? children : label && <Label>{label}</Label>}
        <Input
            id={name}
            type={type}
            placeholder={placeholder}
            {...register(name, registerOptions || {})}
            {...props}
        />
        {error && <ValidationMessage>{error.message}</ValidationMessage>}
    </Field>
);
export default ZodFormField;
