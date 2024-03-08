// Auth lib
// import { Users } from "@/containers/Users";
// import { getUsers } from "@/actions/getUsers";
// import { User } from "@/types";

// Vendors
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export default async function Page() {
  const session = await getServerSession(authOptions);

  console.log(session);

  return <div>Home page</div>;
}
