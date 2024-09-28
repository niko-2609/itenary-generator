"use server"

import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import {
    DEFAULT_LOGIN_REDIRECT,
    publicRoutes,
    authRoutes,
    apiAuthPrefix
} from "@/routes"
import { NextResponse } from "next/server"

const { auth } = NextAuth(authConfig)

// The actual middleware function that is invoked on every request
export default auth((req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    // check if requested route is an api route used by next-auth. If no, move ahead
    if (isApiAuthRoute) {
        return NextResponse.next();
    }

    /**
     * check if requested route is one of the auth routes defined in the application.
     * if user is logged in, not allowed to visit sign-in page
     * if user is not logged in, allowed to visit sign-in page
     */ 

    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return NextResponse.next();
    }

    /**
     * 
     * if user is not logged in and trying to access a route which is not public,
     * then redirect to sign-in page.
     */
    if (!isPublicRoute && !isLoggedIn) {
        return NextResponse.redirect(new URL("/sign-in", nextUrl))
    }


    // if none of above matches, continue with usual flow.
    return NextResponse.next();
})

// Regular expression to match all the routes that will invoke the middleware.
// Here all the routes will invoke the middleware
export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}