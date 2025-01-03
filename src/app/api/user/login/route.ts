import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import bcrypt from "bcrypt";

export async function POST (request: NextRequest){
    const body = await request.json();

    const user = await prisma.user.findFirst({where: {username: body.username}})

    if (user === null) {
        return NextResponse.json("User does not exist", {status: 400})
    }

   if (bcrypt.compareSync(body.password, user.password) === true) {
    const response = {
        username: user.username,
        userRole: user.role,
        userID: user.userID
    }
    return NextResponse.json(response, {status: 200})
   } else {
    return NextResponse.json("Incorrect Password", {status: 400})
   }
}