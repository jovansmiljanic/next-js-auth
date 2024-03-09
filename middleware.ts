import { getToken } from "next-auth/jwt";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "./routes";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const response = NextResponse.next();

  // Checks if the user is logged in
  const isLoggedIn = await getToken({ req, secret: process.env.SECRET });

  // Protects route
  const isApiAuthRoute = req.nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(req.nextUrl.pathname);

  if (!isLoggedIn && isAuthRoute) {
    return null;
  }

  if (isApiAuthRoute) {
    return null;
  }

  if (!isLoggedIn) {
    return Response.redirect(new URL("/login", req.nextUrl));
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

  // Set theme cookie
  const theme = req.cookies.get("theme");

  if (!theme) {
    response.cookies.set({ name: "theme", value: "light", path: "/login" });
  } else {
    response.cookies.set({ name: "theme", value: theme.value, path: "/login" });
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
