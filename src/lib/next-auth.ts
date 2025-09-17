// Simple approach: Use NextAuth session directly
// admin/src/lib/auth.ts (Updated - No JWT library needed)
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/lib/hash";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        const { email, password } = credentials || {};
        if (!email || !password) throw new Error("Missing email or password");

        const user = await User.findOne({ email });
        if (!user) throw new Error("User not found");

        const isValid = await verifyPassword(password, user.password);
        if (!isValid) throw new Error("Invalid credentials");

        return {
          id: user._id.toString(),
          name: user.fullName,
          email: user.email, // Important: Include email
          institution: user.institution,
          phone: user.phone,
          role: user.role,
          avatar: user.avatar,
          chapter: user.chapter,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Create a simple custom token using user data
        const customToken = Buffer.from(
          JSON.stringify({
            userId: user.id,
            email: user.email,
            role: user.role,
            timestamp: Date.now(),
          })
        ).toString("base64");

        token.accessToken = customToken;
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.institution = user.institution;
        token.phone = user.phone;
        token.avatar = user.avatar;
        token.chapter = user.chapter;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.accessToken = token.accessToken as string;
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.institution = token.institution as string;
        session.user.phone = token.phone as string;
        session.user.avatar = token.avatar as string;
        session.user.chapter = token.chapter as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
