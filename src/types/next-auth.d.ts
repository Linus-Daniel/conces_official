import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      chapter: string;
      id: string;
      name: string;
      email: string;
      role: string;
      institution: string;
      phone: string;
      avatar: string;
    };
    accessToken: string;
  }

  interface User {
    role: string;
    phone: string;
    institution: string;
    chapter: string ;
    avatar: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
  }
}
