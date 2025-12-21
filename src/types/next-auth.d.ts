import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      access_token: string;
    };
  }
}

declare module "next-auth" {
  interface User {
    access_token?: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user: User;
    access_token?: string | null;
    error: string;
  }
}
