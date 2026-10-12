import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(req: NextRequest) {
    const tokenFromQuery = req.nextUrl.searchParams.get('access_token') || req.nextUrl.searchParams.get('jwt');

    const tokenFromCookie = req.cookies.get('token')?.value;

    const token = tokenFromCookie || tokenFromQuery;

    if (tokenFromQuery) {
        const response = NextResponse.redirect(new URL('/', req.url));
        response.cookies.set('token', tokenFromQuery, { path: '/', maxAge: 604800 });
        return response;
    }

    const { pathname } = req.nextUrl;
    const isAuthPage = pathname === '/login' || pathname === '/register';

    if (!token && !isAuthPage) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if (token && isAuthPage) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};