import {useForm, type SubmitHandler} from "react-hook-form"
import {Button, ErrorSummary, Field, Input, Label, ValidationMessage} from "@digdir/designsystemet-react";

type Inputs = {
    example: string
    exampleRequired1: string
    exampleRequired2: string
}

export default function SimpleForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    console.log(watch("example"));

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {Object.keys(errors).length > 0 && (
                <ErrorSummary>
                    <ErrorSummary.Heading>Please fix errors</ErrorSummary.Heading>
                    <ErrorSummary.List>
                        {Object.keys(errors).map((key) => (
                            <ErrorSummary.Item key={key}>
                                <ErrorSummary.Link href={`#${key}`}>Field is required</ErrorSummary.Link>
                            </ErrorSummary.Item>
                        ))}
                    </ErrorSummary.List>
                </ErrorSummary>
            )}
            <Field>
                <Label>Not required field</Label>
                <Input defaultValue="test" {...register("example")} />
            </Field>
            <Field>
                <Label>Required field 1</Label>
                <Input id="exampleRequired1" {...register("exampleRequired1", {required: true})} />
                {errors.exampleRequired1 && <ValidationMessage>This field is required</ValidationMessage>}
            </Field>
            <Field>
                <Label>Required field 2</Label>
                <Input id="exampleRequired2" {...register("exampleRequired2", {required: true})} />
                {errors.exampleRequired2 && <ValidationMessage>This field is required</ValidationMessage>}
            </Field>
            <Button type="submit">Send inn</Button>
        </form>
    )
}