import useFormModel from "../hooks/formModel";
import {Heading, Paragraph} from "@digdir/designsystemet-react";

export default function SubmittedDataViewer() {
    const {data} = useFormModel();
    return data ? (
        <article>
            <Heading level={3}>Submitted data</Heading>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </article>
    ) : (
        <article>
            <Heading level={3}>No data submitted yet</Heading>
            <Paragraph>Submit a form to see the submitted data here.</Paragraph>
        </article>
    )
}