import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
} from "./routes";

const { auth } = NextAuth(authConfig);

type RouteType = {
  isApi: boolean;
  isPublic: boolean;
  isAuth: boolean;
};

const getRouteType = (pathname: string): RouteType => ({
  isApi: pathname.startsWith(apiAuthPrefix),
  isPublic: publicRoutes.includes(pathname),
  isAuth: authRoutes.includes(pathname),
});

const buildCallbackUrl = (url: URL): string => {
  let callbackUrl = url.pathname;
  if (url.search) {
    callbackUrl += url.search;
  }
  return encodeURIComponent(callbackUrl);
};

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const isLoggedIn = !!(await auth());
  const routeType = getRouteType(nextUrl.pathname);

  // Allow API routes to pass through
  if (routeType.isApi) {
    return NextResponse.next();
  }

  // Redirect logged-in users away from auth routes
  if (routeType.isAuth) {
    return isLoggedIn
      ? NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
      : NextResponse.next();
  }

  // Redirect non-logged-in users to login for protected routes
  if (!isLoggedIn && !routeType.isPublic) {
    const callbackUrl = buildCallbackUrl(nextUrl);
    return NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${callbackUrl}`, nextUrl)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
