import { NextRequest } from "next/server";
import {z} from "zod";

const createNewIssueSchema = z.object({
    title : z.string().min(1, "Title cannot be empty").max(255, "Tittle cannot exceed 255 characters"),
    desc: z.string().min(1, "Description cannot be empty")
})

export async function POST(request: NextRequest) {
    const body = await request.json();

}