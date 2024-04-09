import { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  stocks: number;
  category: string;
  brand: string;
  owner: Schema.Types.ObjectId;
}
