import { NextRequest, NextResponse } from "next/server";
import {z} from "zod";
import prisma from "../../../../../prisma/client";
import bcrypt from "bcrypt";


enum userRole {
    ADMIN,
    USER
  }

const createNewUserSchema = z.object({
    username: z.string().min(1, "Username cannot be empty").max(255, "Username is too long"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    role: z.enum(Object.keys(userRole) as [keyof typeof userRole], {message: "User role must be either 'admin' or 'user'"})
}).superRefine(({ password }, checkPassComplexity) => {
    const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
    const containsLowercase = (ch: string) => /[a-z]/.test(ch);
    const containsSpecialChar = (ch: string) =>
      /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
    let countOfUpperCase = 0,
      countOfLowerCase = 0,
      countOfNumbers = 0,
      countOfSpecialChar = 0;
    for (let i = 0; i < password.length; i++) {
      const ch = password.charAt(i);
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

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createNewUserSchema.safeParse(body);
  const existUser = await prisma.user.findFirst({where: {username: body.username}});

  if (existUser !== null) {
    return NextResponse.json("User exists", {status: 400});
  }

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, {status: 400});
  } else {
    const generatedSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, generatedSalt);
    try {
      const newUser = await prisma.user.create({
          data: {
              username: body.username,
              password: hashedPassword,
              role: body.role
          }
      })
  
      return NextResponse.json(newUser, {status: 201});
    } catch (error) {

      return NextResponse.json(error, {status:400})
      
    }
  }

  // return NextResponse.json(body, {status: 201})
}

