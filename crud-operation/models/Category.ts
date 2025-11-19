import mongoose, { Document, Model } from "mongoose";

export interface ICategory extends Document {
  name: string;
  image: string; // URL or local path
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new mongoose.Schema<ICategory>(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

const Category: Model<ICategory> = (mongoose.models.Category as Model<ICategory>) || mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
