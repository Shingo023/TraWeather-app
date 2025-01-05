import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Temporary logs for debugging
  console.log("✅ Middleware triggered");
  console.log("🔑 Environment (NEXTAUTH_URL):", process.env.NEXTAUTH_URL);

  // Access token from cookies
  const sessionToken =
    req.cookies.get("__Secure-next-auth.session-token") ||
    req.cookies.get("next-auth.session-token");

  console.log(
    "🔒 Session Token:",
    sessionToken ? "Token found" : "No token found"
  );

  const { pathname } = req.nextUrl;
  console.log("🛤️ Pathname:", pathname);

  // Redirect to login if no token is found and accessing "/favorite-list"
  if (!sessionToken && pathname === "/favorite-list") {
    console.log("🚫 No token found, redirecting to /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  console.log("✅ Token found or not required, proceeding to next middleware");
  return NextResponse.next({
    headers: {
      "Cache-Control": "no-store", // Prevent caching
    },
  });
}

export const config = {
  matcher: ["/favorite-list"], // Simplified matcher for clarity
};
