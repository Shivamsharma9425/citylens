import mongoose, { Schema, models, model } from "mongoose";

const IssueSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: ["Road", "Streetlight", "Garbage", "Water", "Electricity", "Other"],
      required: true,
    },
    department: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["PENDING", "IN_PROGRESS", "RESOLVED", "REJECTED"],
      default: "PENDING",
    },

    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      default: "LOW",
    },

    reportedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    upvotes: {
      type: Number,
      default: 0,
    },
    upvotedBy: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
    location: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },

    longitude: {
      type: Number,
      required: true,
    },
    history: [
      {
        status: String,
        updatedAt: Date,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Issue = models.Issue || model("Issue", IssueSchema);

export default Issue;
