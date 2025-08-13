import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next).*)'],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token && !request.url.includes('/auth') && process.env.NEXTAUTH_URL) {
    return NextResponse.redirect(process.env.NEXTAUTH_URL + '/auth');
  } else if (token && request.url.includes('/auth')) {
    return NextResponse.redirect(process.env.NEXTAUTH_URL || '/');
  }
}
