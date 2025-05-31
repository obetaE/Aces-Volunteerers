import { NextResponse } from "next/server";
import { connectMongoDB } from "@/libs/config/db"
import UserModel from "@/libs/models/UserModel"

export async function POST(req) {
    try {
        const { fullname, email, password } = await req.json();
        console.log("Fullname:", fullname);
        console.log("Email:", email);
        console.log("Password:", password);
            
    
        const dbFullname = fullname.toLowerCase();
        const dbEmail = email.toLowerCase();
        await connectMongoDB();
        await UserModel.create({ fullname: dbFullname, email: dbEmail, password })


        return NextResponse.json({ message: "User Registered" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "An Error occured while registering the user" }, { status: 500 });
    }
}




