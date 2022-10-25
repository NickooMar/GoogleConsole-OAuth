import { Schema, model, Document } from "mongoose";

interface UserDocument extends Document {
  email: string;
  avatar: string;
  name: string;
}

const UserSchema = new Schema({
  email: { type: String, required: true },
  avatar: { type: String, default: "" },
  name: { type: String, required: true },
});

export default model<UserDocument>("User", UserSchema);
