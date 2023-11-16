import {NextResponse} from 'next/server'

export function middleware(request) {
    let apiToken = request.cookies.get('api-token')?.value

    if (!apiToken) {
        return NextResponse.redirect(new URL('/user', request.url))
    }
}

export const config = {
    matcher: [
        '/((?!user|api|_next/static|_next/image|favicon.ico|).*)',
        '/book/:path*',
        '/'
    ],
}