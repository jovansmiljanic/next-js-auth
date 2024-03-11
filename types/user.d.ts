// Vendor types
import type { Types, Document } from "mongoose";

export interface User {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  emailVerified: Date;
  user: Types.PopulatedDoc<User & Document>;
}
