import {PersonSchema} from "../src/types.ts";

export async function POST(request: Request) {
    const body = await request.json();
    const result = PersonSchema.safeParse(body);
    if (result.success) {
        return Response.json({success: true});
    }
    const serverErrors = Object.fromEntries(
        result.error?.issues?.map((issue) => [issue.path[0], issue.message]) || []
    );
    return new Response(JSON.stringify(serverErrors), {status: 400});
}