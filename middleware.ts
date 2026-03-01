import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('auth_token')?.value;
    const isAuthPage = request.nextUrl.pathname.startsWith('/login');
    const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname.startsWith('/appointments') || request.nextUrl.pathname.startsWith('/patients') || request.nextUrl.pathname.startsWith('/billing') || request.nextUrl.pathname.startsWith('/inventory') || request.nextUrl.pathname.startsWith('/reports') || request.nextUrl.pathname.startsWith('/settings');

    // If going to dashboard without token, redirect login
    if (!token && (isDashboardPage || request.nextUrl.pathname === '/')) {
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    // If going to login with token, redirect dashboard
    if (token && isAuthPage) {
        const dashboardUrl = new URL('/dashboard', request.url);
        return NextResponse.redirect(dashboardUrl);
    }

    if (request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
};
