import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function POST (req: NextRequest) {
    const body = await req.json();
    const user = await prisma.user.findUnique({where:
        {userID: body.userID}
    })

    if (user === null) {
        return NextResponse.json("User does not exist", {status: 400});
    } else {
        return NextResponse.json(user, {status: 200});
    }


}