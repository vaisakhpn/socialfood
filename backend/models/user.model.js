import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "http://www.gravatar.com/avatar/?d=mp",
    },
    subscribedChannel: {
      type: [String],
    },
    fromGoogle: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.statics.countChannels = async function (userId) {
  const Channel = mongoose.model("Channel");
  return await Channel.countDocuments({ userId });
};

const User = mongoose.model.User || mongoose.model("User", userSchema);
export default User;
