import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
        id:string
      name: string;
      email: string;
      role: string;
      institution:string;
      phone:string

    };
  }

  interface User {
    role: string;
    phone:string;
    institution:string;

  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string;
  }
}
