import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    channelId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    locationUrl: {
      type: String,
      required: true,
    },
    locationName: {
      type: String,
      required: true,
    },
    likes: {
      type: [String],
      default: [],
    },
    dislikes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Video = mongoose.model.Video || mongoose.model("Video", videoSchema);
export default Video;
