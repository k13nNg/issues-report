import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const body = req.headers.get("Authorization");
    if (body == process.env.NEXT_PUBLIC_API_KEY) {
        // return NextResponse.next();

        // enable CORS
        // retrieve the current response
        const res = NextResponse.next()

        // add the CORS headers to the response
        res.headers.append('Access-Control-Allow-Credentials', "true")
        res.headers.append('Access-Control-Allow-Origin', '*') 
        res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
        res.headers.append(
            'Access-Control-Allow-Headers',
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
        )

        return res
    } else {
        return NextResponse.json("Unauthorized access", {status: 400})
    }
}

export const config = {
    matcher: "/api/:path*"
}