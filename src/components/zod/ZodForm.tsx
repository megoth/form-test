import {useForm} from "react-hook-form";
import ZodFormField from "./ZodFormField";
import {Button, ErrorSummary, Heading, Label, Paragraph, Tag} from "@digdir/designsystemet-react";
import {zodResolver} from "@hookform/resolvers/zod";
import useFormModel from "../../hooks/formModel";
import {PersonSchema, type PersonSchemaType} from "../../types";

function ZodForm() {
    const {post, setData, setResponse} = useFormModel();
    const {
        getValues,
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<PersonSchemaType>({
        resolver: zodResolver(PersonSchema)
    });

    const onReset = () => {
        reset();
        setData(null);
        setResponse(null);
    };

    const onSubmit = (data: PersonSchemaType) => post("/api/validatePerson", data);

    return (
        <>
            <Heading level={2}>Form with Zod</Heading>
            <Paragraph>
                This form uses Zod to validate the input on the frontend and on the backend.
            </Paragraph>
            <form onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
                {Object.keys(errors).length > 0 && (
                    <ErrorSummary>
                        <ErrorSummary.Heading>Please fix errors</ErrorSummary.Heading>
                        <ErrorSummary.List>
                            {Object.entries(errors).map(([key, error]) => (
                                <ErrorSummary.Item key={key}>
                                    <ErrorSummary.Link href={`#${key}`}>{error.message}</ErrorSummary.Link>
                                </ErrorSummary.Item>
                            ))}
                        </ErrorSummary.List>
                    </ErrorSummary>
                )}

                <ZodFormField
                    type="text"
                    placeholder="Name"
                    name="name"
                    register={register}
                    error={errors.name}
                    registerOptions={{required: true}}>
                    <Label>
                        <span>Name</span>
                        <Tag data-color="warning" variant="outline">Required</Tag>
                    </Label>
                </ZodFormField>

                <ZodFormField
                    type="number"
                    placeholder="Age"
                    name="age"
                    register={register}
                    error={errors.age}
                    registerOptions={{
                        setValueAs: (value) => parseInt(value || 0, 10),
                    }}>
                    <Label>
                        <span>Age</span>
                        <Tag data-color="info" variant="outline">Optional</Tag>
                    </Label>
                </ZodFormField>
                <div className="form-controls">
                    <Button type="submit">Submit</Button>
                    <Button type="button" variant="secondary" onClick={() => onSubmit(getValues())}>
                        Submit (without validation)
                    </Button>
                    <Button type="reset" variant="tertiary">Reset</Button>
                </div>
            </form>
        </>
    );
}

export default ZodForm;
