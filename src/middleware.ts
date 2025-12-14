import { getToken } from 'next-auth/jwt';
import type { MiddlewareConfig, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (token && 'role' in token) {
    const userRole = token.role;

    if (request.nextUrl.pathname === '/dashboard') {
      if (userRole !== 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard/posts', request.url));
      }
    }
  }

  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (!token) {
    return NextResponse.redirect(new URL('/api/auth/signin', request.url));
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: ['/', '/dashboard/:path*'],
};
