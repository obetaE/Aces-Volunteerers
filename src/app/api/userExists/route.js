import { connectMongoDB } from "@/libs/config/db";
import Messages from "@/libs/models/Messages"; // Use your volunteer model
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { firstname, lastname, level, number } = await req.json();
    await connectMongoDB();

    // Check for existing volunteer with ALL matching fields
    const existingVolunteer = await Messages.findOne({
      firstname,
      lastname,
      level,
      number,
    });

    return NextResponse.json({ exists: !!existingVolunteer });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error checking volunteer existence" },
      { status: 500 }
    );
  }
}
