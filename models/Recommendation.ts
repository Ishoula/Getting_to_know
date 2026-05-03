import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRecommendation extends Document {
  name: string;
  role: string;
  company?: string;
  testimonial: string;
  avatar?: string;
  featured: boolean;
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RecommendationSchema = new Schema<IRecommendation>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      trim: true,
      maxlength: [100, "Role cannot exceed 100 characters"],
    },
    company: {
      type: String,
      required: false,
      trim: true,
      maxlength: [100, "Company cannot exceed 100 characters"],
    },
    testimonial: {
      type: String,
      required: [true, "Testimonial is required"],
      trim: true,
      maxlength: [500, "Testimonial cannot exceed 500 characters"],
    },
    avatar: {
      type: String,
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    approved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Recommendation: Model<IRecommendation> =
  mongoose.models.Recommendation ||
  mongoose.model<IRecommendation>("Recommendation", RecommendationSchema);

export default Recommendation;
