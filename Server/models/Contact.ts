import mongoose, { Document, Schema, Model } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const contactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const Contact: Model<IContact> = mongoose.model<IContact>(
  "Contact",
  contactSchema
);

export default Contact;
