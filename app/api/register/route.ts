// Models
import { database } from "@/lib/server";
import { User } from "@/models";

// Vendors
import bcrypt from "bcryptjs";

export async function POST(request: Request, response: Response) {
  // Connect to mongoDb database
  await database();

  const body = await request.json();

  const { fullName, email, password } = body;

  const isEmailTaken = Boolean(await User.findOne({ email }));

  if (isEmailTaken)
    return new Response("Email is already used", { status: 409 });

  const encryptedPassword = await bcrypt.hash(password, 8);

  const [firstName, lastName] = fullName.split(" ");

  // Create user model object
  const user = new User({
    firstName,
    lastName,
    email,
    password: encryptedPassword,
  });

  // Store user on the Database
  await user.save();

  return new Response(JSON.stringify(user), { status: 200 });
}
