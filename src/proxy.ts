import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(req: NextRequest) {
    const tokenFromQuery = req.nextUrl.searchParams.get('access_token') || req.nextUrl.searchParams.get('jwt');

    const tokenFromCookie = req.cookies.get('token')?.value;

    if (tokenFromQuery) {
        const response = NextResponse.redirect(new URL('/', req.url));
        response.cookies.set('token', tokenFromQuery, { path: '/', maxAge: 604800 });
        return response;
    }

    if (req.nextUrl.pathname === '/cart' && !tokenFromCookie) {
        const loginUrl = new URL('/login', req.url);
        loginUrl.searchParams.set('next', '/cart');
        return NextResponse.redirect(loginUrl);
    }

    if ((req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register') && tokenFromCookie) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
