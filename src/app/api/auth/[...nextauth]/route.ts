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
          institution: user.institution,
          phone: user.phone,
          role: user.role,
        };
      },
      
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.institution = user.institution;
        token.phone = user.phone;
        token.name = user.name; // include name explicitly (optional but good)
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.institution = token.institution as string;
        session.user.phone = token.phone as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt", // Important: use JWT session strategy
  },

  secret: process.env.NEXTAUTH_SECRET,
};

// Handler exports for route.ts file
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
