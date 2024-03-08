import { getUsers } from "@/actions/getUsers";
import { User } from "@/types";

export default async function Page({ params }: { params: { id: string } }) {
  const users: User[] = await getUsers();
  const user = users.find(user => user._id.toString() === params.id);

  console.log(user);
  return (
    <div>
      <div>My id: {user?._id.toString()}</div>
      <div>My name: {user?.name}</div>
      <div>My email: {user?.email}</div>
    </div>
  );
}
