import { connectMongoDB } from "@/libs/config/db";
import Register from "@/libs/models/Register" // Use your volunteer model
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { fullname, email, number, expectation } = await req.json();
    await connectMongoDB();

    // Check for existing volunteer with ALL matching fields
    const existingVolunteer = await Register.findOne({
      fullname,
      email,
      number,
      expectation,
    });

    return NextResponse.json({ exists: !!existingVolunteer });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error checking register existence" },
      { status: 500 }
    );
  }
}
