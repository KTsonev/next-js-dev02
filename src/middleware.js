import {NextResponse} from 'next/server'

export function middleware(request) {
    if (!request.nextUrl.pathname.startsWith('/user/login')) {
        return NextResponse.redirect(new URL('/user/login', request.url))
    }
}

export const config = {
    matcher: [
        '/((?!api/_next/static|_next/image|favicon.ico|).*)',
        '/((?!user/login))',
        '/((?!user/logout))',
        '/((?!user/register))'
    ],
}