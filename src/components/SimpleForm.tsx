import {useForm} from "react-hook-form"
import {
    Button,
    ErrorSummary,
    Field, Heading,
    Input,
    Label,
    Paragraph, Tag,
    ValidationMessage
} from "@digdir/designsystemet-react";
import useFormModel from "../hooks/formModel";

type Inputs = {
    field1: string
}

export default function SimpleForm() {
    const {setData} = useFormModel();
    const {
        getValues,
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<Inputs>()

    return (
        <>
            <Heading level={2}>Simple form</Heading>
            <Paragraph>
                This is a simple form, with only one required field. It will trigger an error if it doesn't have a value
                when submitting the form.
            </Paragraph>
            <form onSubmit={handleSubmit(setData)} onReset={() => {
                reset();
                setData(null);
            }}>
                {Object.keys(errors).length > 0 && (
                    <ErrorSummary>
                        <ErrorSummary.Heading>Please fix errors</ErrorSummary.Heading>
                        <ErrorSummary.List>
                            {errors.field1 && (
                                <ErrorSummary.Item>
                                    <ErrorSummary.Link href={`#field1`}>
                                        Field 1 is missing value
                                    </ErrorSummary.Link>
                                </ErrorSummary.Item>
                            )}
                        </ErrorSummary.List>
                    </ErrorSummary>
                )}
                <Field>
                    <Label>
                        <span>Field 1</span>
                        <Tag data-color="warning" variant="outline">Required</Tag>
                    </Label>
                    <Input {...register("field1", {required: true})} />
                    {errors.field1 && <ValidationMessage>Missing value</ValidationMessage>}
                </Field>
                <div className="form-controls">
                    <Button type="submit">Submit</Button>
                    <Button type="button" variant="secondary" onClick={() => setData(getValues())}>
                        Submit (without validation)
                    </Button>
                    <Button type="reset" variant="tertiary">Reset</Button>
                </div>
            </form>
        </>
    )
}