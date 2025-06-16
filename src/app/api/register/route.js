import { NextResponse } from "next/server";
import { connectMongoDB } from "@/libs/config/db"
import Register from "@/libs/models/Register"

export async function GET() {
  try {
    await connectMongoDB();
    const volunteers = await Register.find().sort({ createdAt: -1 }); // Newest first
    return NextResponse.json(volunteers, { status: 200 });
  } catch (error) {
    console.error("Error fetching registered users:", error);
    return NextResponse.json(
      { message: "Error fetching registered users" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
    try {
        const regData = await req.json();
        console.log(regData);

        await connectMongoDB();
        await Register.create({ fullname: regData.fullname, email: regData.email , number: regData.number, expectation: regData.expectation })


        return NextResponse.json({ message: "User Registered" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "An Error occured while registering the user" }, { status: 500 });
    }
}




