import {useForm} from "react-hook-form"
import {
    Button,
    ErrorSummary,
    Field, Heading,
    Input,
    Label,
    Paragraph,
    Tag,
    ValidationMessage
} from "@digdir/designsystemet-react";
import useFormModel from "../hooks/formModel";

type Inputs = {
    field1: string
    field2: string
    field3: string
}

export default function ComplexForm() {
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
            <Heading level={2}>Complex form</Heading>
            <Paragraph>
                This is a somewhat complex form, with one optional and two required fields. Also, the last field is a
                date field that requires a date set in the future.
            </Paragraph>
            <form onSubmit={handleSubmit(setData)} onReset={() => {
                reset();
                setData(null);
            }}>
                {Object.keys(errors).length > 0 && (
                    <ErrorSummary>
                        <ErrorSummary.Heading>Please fix errors</ErrorSummary.Heading>
                        <ErrorSummary.List>
                            {errors.field2 && (
                                <ErrorSummary.Item>
                                    <ErrorSummary.Link href={`#field2`}>
                                        Field 2 is missing value
                                    </ErrorSummary.Link>
                                </ErrorSummary.Item>
                            )}
                            {errors.field3 && (
                                <ErrorSummary.Item>
                                    <ErrorSummary.Link href={`#field3`}>
                                        {errors.field3.type === "required" && "Field 3 is missing value"}
                                        {errors.field3.type === "validate" && "Field 3 must have date set in the future"}
                                    </ErrorSummary.Link>
                                </ErrorSummary.Item>
                            )}
                        </ErrorSummary.List>
                    </ErrorSummary>
                )}
                <Field>
                    <Label>
                        <span>Field 1</span>
                        <Tag data-color="info" variant="outline">Optional</Tag>
                    </Label>
                    <Input {...register("field1")} />
                </Field>
                <Field>
                    <Label>
                        <span>Field 2</span>
                        <Tag data-color="warning" variant="outline">Required</Tag>
                    </Label>
                    <Input id="field2" {...register("field2", {required: true})} />
                    {errors.field2 && <ValidationMessage>Missing value</ValidationMessage>}
                </Field>
                <Field>
                    <Label>
                        <span>Field 3</span>
                        <Tag data-color="warning" variant="outline">Required</Tag>
                    </Label>
                    <Field.Description>Date must be set in the future</Field.Description>
                    <Input id="field3" type="date" {...register("field3", {
                        required: true,
                        validate: (date) => (new Date(date)).getTime() > (new Date()).getTime()
                    })} />
                    {errors.field3?.type === "required" && <ValidationMessage>Missing value</ValidationMessage>}
                    {errors.field3?.type === "validate" && <ValidationMessage>Invalid date</ValidationMessage>}
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