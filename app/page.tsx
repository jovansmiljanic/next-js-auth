// Auth lib
import { authOptions } from "@/lib/authOptions";

// Vendors
import { getServerSession } from "next-auth/next";

export default async function Page() {
  const session = await getServerSession(authOptions);

  console.log(session);

  return <div>Hello world!</div>;
}
