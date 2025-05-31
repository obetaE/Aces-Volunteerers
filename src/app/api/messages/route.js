import { connectMongoDB } from "@/libs/config/db";
import Messages from "@/libs/models/Messages";
import { NextResponse } from "next/server";

// GET endpoint to fetch all volunteers
export async function GET() {
  try {
    await connectMongoDB();
    const volunteers = await Messages.find().sort({ createdAt: -1 }); // Newest first
    return NextResponse.json(volunteers, { status: 200 });
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    return NextResponse.json(
      { message: "Error fetching volunteers" },
      { status: 500 }
    );
  }
}

// POST endpoint to create a new volunteer
export async function POST(req) {
  try {
    const { firstname, lastname, level, number } = await req.json();

    await connectMongoDB();

    // Create new volunteer document
    await Messages.create({ firstname, lastname, level, number });

    return NextResponse.json(
      { message: "User has been volunteered" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      {
        message: "Error occurred while accepting volunteer",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
