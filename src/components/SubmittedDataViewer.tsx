import useFormModel from "../hooks/formModel";
import {Heading, Paragraph, Tag} from "@digdir/designsystemet-react";
import {useEffect, useState} from "react";

export default function SubmittedDataViewer() {
    const {data, response} = useFormModel();
    const [responseJson, setResponseJson] = useState<Record<string, unknown> | null>(null);
    useEffect(() => {
        if (!response) return;
        response.json().then(setResponseJson);
    }, [response])
    return (
        <>
            {data ? (
                <article>
                    <Heading level={3}>Submitted data</Heading>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </article>
            ) : (
                <article>
                    <Heading level={3}>No data submitted yet</Heading>
                    <Paragraph>Submit a form to see the submitted data here.</Paragraph>
                </article>
            )}
            {response && responseJson && (
                <article>
                    <Heading level={3}>Response from server</Heading>
                    <Paragraph>
                        {response.status >= 200 && response.status < 400 && <Tag data-color="success">{response.status}</Tag>}
                        {response.status >= 400 && <Tag data-color="danger">{response.status}</Tag>}
                    </Paragraph>
                    <pre>{JSON.stringify(responseJson, null, 2)}</pre>
                </article>
            )}
        </>
    )
}