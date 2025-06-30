import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      branch: string;
        id:string
      name: string;
      email: string;
      role: string;
      institution:string;
      phone:string;
      avatar:string

    };
  }

  interface User {
    role: string;
    phone:string;
    institution:string;
    branch:string;
    avatar:string


  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string;
  }
}
