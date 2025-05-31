import { connectMongoDB } from "@/libs/config/db";
import UserModel from "@/libs/models/UserModel";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials", // Changed from 'fullname' to 'name'
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connectMongoDB();
          const user = await UserModel.findOne({ email });

          if (!user) {
            return null;
          }

          // DIRECT PASSWORD COMPARISON (INSECURE)
          const passwordMatch = password === user.password;

          if (!passwordMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
          return null; // Important to return null on error
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
