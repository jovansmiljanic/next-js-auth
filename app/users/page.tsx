// Core types
import { getUsers } from "@/actions/getUsers";
import { User } from "@/types";
import Link from "next/link";

export default async function Page() {
  const users: User[] = await getUsers();

  return (
    <div>
      {users.map((user, i) => (
        <Link href={`/users/${user._id.toString()}`} key={i}>
          {user.name}
        </Link>
      ))}
    </div>
  );
}
