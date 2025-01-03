import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";

const handler = NextAuth(authOptions);

// Export both GET and POST handlers for NextAuth API routes
export { handler as GET, handler as POST };
