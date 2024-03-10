// Next auth
import { getToken } from "next-auth/jwt";

// Local routes
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "./routes";

// Core
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const response = NextResponse.next();

  // Set theme cookie
  const theme = req.cookies.get("theme");

  if (!theme) {
    response.cookies.set({ name: "theme", value: "light" });
  } else {
    response.cookies.set({ name: "theme", value: theme.value });
  }

  // Checks if the user is logged in
  const isLoggedIn = await getToken({ req, secret: process.env.SECRET });

  // Protects route
  const isApiAuthRoute = req.nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(req.nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }

  return null;
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
