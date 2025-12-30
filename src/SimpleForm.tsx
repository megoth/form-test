import {useForm, type SubmitHandler} from "react-hook-form"
import {Button, ErrorSummary, Field, Input, Label, Tag, ValidationMessage} from "@digdir/designsystemet-react";

type Inputs = {
    field1: string
    field2: string
    field3: string
}

export default function SimpleForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
        reset,
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    console.log(watch("field1"));

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={() => reset()}>
            {Object.keys(errors).length > 0 && (
                <ErrorSummary>
                    <ErrorSummary.Heading>Please fix errors</ErrorSummary.Heading>
                    <ErrorSummary.List>
                        {Object.keys(errors).map((key) => (
                            <ErrorSummary.Item key={key}>
                                <ErrorSummary.Link href={`#${key}`}>Required field is missing value</ErrorSummary.Link>
                            </ErrorSummary.Item>
                        ))}
                    </ErrorSummary.List>
                </ErrorSummary>
            )}
            <Field>
                <Label>
                    <span>Field 1</span>
                    <Tag data-color="info">Optional</Tag>
                </Label>
                <Input {...register("field1")} />
            </Field>
            <Field>
                <Label>
                    <span>Field 2</span>
                    <Tag data-color="warning">Required</Tag>
                </Label>
                <Input id="field2" {...register("field2", {required: true})} />
                {errors.field2 && <ValidationMessage>Missing value</ValidationMessage>}
            </Field>
            <Field>
                <Label>
                    <span>Field 3</span>
                    <Tag data-color="warning">Required</Tag>
                </Label>
                <Input id="field3" {...register("field3", {required: true})} />
                {errors.field3 && <ValidationMessage>Missing value</ValidationMessage>}
            </Field>
            <div className="form-controls">
                <Button type="submit">Submit</Button>
                <Button type="reset" variant="secondary">Reset</Button>
            </div>
        </form>
    )
}