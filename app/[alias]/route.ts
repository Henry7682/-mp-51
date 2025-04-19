import getCollection, { POSTS_COLLECTION } from "@/db";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    context: { params: { alias: string } }
) {
    const { alias } = context.params;
    const baseUrl = new URL(request.url).origin;

    try {
        const collection = await getCollection(POSTS_COLLECTION);
        const result = await collection.findOne({ alias });

        if (!result) {
            return NextResponse.redirect(`${baseUrl}/`);
        }

        console.log("Redirecting to:", result.url);
        return NextResponse.redirect(result.url);
    } catch (err) {
        console.error(err);
        return NextResponse.redirect(`${baseUrl}/`);
    }
}
