import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./app/authentication";

export async function middleware(req: NextRequest) {
    const body = req.headers.get("Authorization");
    if (body == process.env.NEXT_PUBLIC_API_KEY) {
        // return NextResponse.next();

        // retrieve the current response
        return await updateSession(req)

    } else {
        return NextResponse.json("Unauthorized access", {status: 400})
    }
}

export const config = {
    matcher: "/api/:path*"
}