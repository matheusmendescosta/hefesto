import { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

interface CustomUser {
  id: string;
  name: string;
  email: string;
  access_token: string;
}

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sessions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        const user = await response.json();

        console.log('API Response:', JSON.stringify(user, null, 2));

        if (user && response.ok) {
          return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    error: '/sign-in',
    signIn: '/sign-in',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.accessToken = (user as CustomUser).access_token;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        name: token.name as string,
        email: token.email as string,
      };
      session.accessToken = token.accessToken as string;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
