import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  problemSolved?: string;
  myRole?: string;
  keyChallenges?: string[];
  screenshots?: string[];
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    problemSolved: {
      type: String,
      trim: true,
      maxlength: [500, "Problem solved cannot exceed 500 characters"],
    },
    myRole: {
      type: String,
      trim: true,
      maxlength: [200, "Role cannot exceed 200 characters"],
    },
    keyChallenges: {
      type: [String],
      default: [],
    },
    screenshots: {
      type: [String],
      default: [],
    },
    techStack: {
      type: [String],
      required: [true, "At least one technology is required"],
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: "At least one technology is required",
      },
    },
    githubUrl: {
      type: String,
      trim: true,
    },
    liveUrl: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
