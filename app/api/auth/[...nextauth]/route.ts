// Vendors
import NextAuth from "next-auth";

// Auth lib
import { authOptions } from "@/lib/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
