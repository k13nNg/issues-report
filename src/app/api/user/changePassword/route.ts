import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import {z} from "zod";
import bcrypt from "bcrypt";

const changePasswordSchema = z.object({
    username: z.string().min(1, "Username cannot be empty").max(255, "Username is too long"),
    currentPassword: z.string().min(8, "Password must be at least 8 characters long"),
    newPassword: z.string().min(8, "Password must be at least 8 characters long"),
    confirmNewPassword: z.string().min(8, "Password must be at least 8 characters long"),
}).superRefine(({ newPassword }, checkPassComplexity) => {
    function containsUppercase (ch: string) {return /[A-Z]/.test(ch)};
    function containsLowercase (ch: string) {return /[a-z]/.test(ch)};
    function containsSpecialChar (ch: string)
      {return /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch)};
    let countOfUpperCase = 0,
      countOfLowerCase = 0,
      countOfNumbers = 0,
      countOfSpecialChar = 0;
    for (let i = 0; i < newPassword.length; i++) {
      const ch = newPassword.charAt(i);
      if (!isNaN(+ch)) countOfNumbers++;
      else if (containsUppercase(ch)) countOfUpperCase++;
      else if (containsLowercase(ch)) countOfLowerCase++;
      else if (containsSpecialChar(ch)) countOfSpecialChar++;
    }
    if (
      countOfLowerCase < 1 ||
      countOfUpperCase < 1 ||
      countOfSpecialChar < 1 ||
      countOfNumbers < 1
    ) {
      checkPassComplexity.addIssue({
        code: "custom",
        message: "Password must contain at least: 1 uppercase character, 1 lowercase character and 1 special character",
        });
    }
});

export async function PUT (req: NextRequest) {
    const body = await req.json();
    const validation = changePasswordSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.errors, {
            status: 400
        });
    }

    const user = await prisma.user.findUnique({ where:
        {username: body.username}
    })

    if (user === null) {
        return NextResponse.json("User does not exist", {status: 400});
    } else {
        const generatedSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.newPassword, generatedSalt);

        if (await bcrypt.compare(hashedPassword, user.password) === true) {
            return NextResponse.json("Current password does not match", {status: 400})
        } else {

            try {
                const newUser = await prisma.user.update(
                    {where: {
                        username: body.username
                    },
                    data: {
                        password: hashedPassword
                    }}
                )
            
                return NextResponse.json(newUser, {status: 201});
            } catch (error) {
    
                return NextResponse.json(error, {status:400})
                
                }
        }

    }
}