// Vendor types
import type { Types, Document } from "mongoose";

export interface User {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  user: Types.PopulatedDoc<User & Document>;
}
