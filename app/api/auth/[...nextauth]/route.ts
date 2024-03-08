// Vendors
import NextAuth from "next-auth";

// Auth config
import { authOptions } from "@/lib/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
