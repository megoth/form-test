import * as z from "zod";

export type PersonData = {
    name: string;
    age?: number;
};

export const PersonSchema = z.object({
    name: z.string().nonempty({
        message: "Name is required",
    }),
    age: z.number().optional(),
});

export type PersonSchemaType = z.infer<typeof PersonSchema>;
