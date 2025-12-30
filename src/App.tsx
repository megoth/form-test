import SimpleForm from "./SimpleForm.tsx";
import {Heading} from "@digdir/designsystemet-react";

export default function App() {
    return (
        <main>
            <Heading level={1}>Testing React Form Hook and Zod</Heading>
            <SimpleForm/>
        </main>
    )
}
