
import { auth } from "@/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// To handle a GET request to /api
export async function GET(request:any) {
  // Do whatever you want
  const cook=cookies()
  const token = auth({req,process.env.NEXTAUTH_SECRET})
  return NextResponse.json({ message: "Hello World",token:cook.get("authjs.session-token")?.value }, { status: 200 });
}

// To handle a POST request to /api
export async function POST(request:any) {
  // Do whatever you want
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}