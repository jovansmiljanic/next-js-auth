// Vendors
import { getServerSession } from "next-auth/next";

// Auth options
import { authOptions } from "@/lib/authOptions";

export default async function Page() {
  const session = await getServerSession(authOptions);

  console.log(session);

  return <div>Home page</div>;
}
