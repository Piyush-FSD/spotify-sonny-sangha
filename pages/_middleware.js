import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export const middleware = async (req) => {
    // Token will exist if user is loged in
    const token = await getToken({ req, secret: process.env.JWT_SECRET })

    const { pathname } = req.nextUrl;

    // Allow the request if the following is true:

    // 1. it's a request for next-auth session & provider fetching
    // 2. if the token exists

    if (pathname.includes('/api/auth') || token) {
        return NextResponse.next();
    }

    // Redirect them to login if they dont have a token & are requesting a protected route
    if (!token && pathname !== '/login') {
        const url = req.nextUrl.clone();
        url.pathname = "/login"

        return NextResponse.redirect(url)
    }

}