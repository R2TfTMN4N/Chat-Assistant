import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Public routes - no auth required
const isPublicRoute = createRouteMatcher([
  "/",
  "/landing(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/test(.*)",
]);

// Routes that don't require organization selection
const isOrgFreeRoute = createRouteMatcher([
  "/",
  "/landing(.*)",
  "/org-selection(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/test(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, orgId } = await auth();

  // Allow public routes without authentication
  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  // Redirect to org selection if user is signed in but has no org
  if (userId && !orgId && !isOrgFreeRoute(req)) {
    const searchParams = new URLSearchParams({ redirectUrl: req.url });
    const orgSelection = new URL(
      `/org-selection?${searchParams.toString()}`,
      req.url,
    );
    return NextResponse.redirect(orgSelection);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
