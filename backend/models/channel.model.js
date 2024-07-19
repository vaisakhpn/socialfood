import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    channelName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    gpayId: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    subscribers: {
      type: Number,
      default: 0,
    },
    totViews: {
      type: Number,
      default: 0,
    },
    totLikes: {
      type: Number,
      default: 0,
    },
    totDislikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Channel", channelSchema);
