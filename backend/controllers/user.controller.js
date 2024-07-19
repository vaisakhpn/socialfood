import { errorHandler } from "../middleware/error.js";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import Video from "../models/video.model.js";
import Channel from "../models/channel.model.js";

export const test = (req, res) => {
  res.json({
    message: "Api route is working",
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account"));
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own account"));

  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(errorHandler(404, "User not found!"));

    const channelCount = await User.countChannels(req.user.id);

    res.status(200).json({
      ...user._doc,
      channelCount,
    });
  } catch (error) {
    next(error);
  }
};
export const subscribe = async (req, res, next) => {
  const channelId = req.params.channelId;
  try {
    const channel = await Channel.findById(channelId);
    if (!channel) {
      return next(errorHandler(404, "Channel not found!"));
    }

    await Channel.findByIdAndUpdate(channelId, {
      $inc: { subscribers: 1 },
    });

    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedChannel: channelId },
    });

    res.status(200).json("Subscription successful.");
  } catch (error) {
    next(error);
  }
};

export const unsubscribe = async (req, res, next) => {
  const channelId = req.params.channelId;
  try {
    const channel = await Channel.findById(channelId);
    if (!channel) {
      return next(errorHandler(404, "Channel not found!"));
    }

    await Channel.findByIdAndUpdate(channelId, {
      $inc: { subscribers: -1 },
    });

    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedChannel: channelId },
    });

    res.status(200).json("Unsubscription successful.");
  } catch (error) {
    next(error);
  }
};

export const like = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { dislikes: id },
    });
    res.status(200).json("The video has been liked.");
  } catch (err) {
    next(err);
  }
};

export const dislike = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });
    res.status(200).json("The video has been disliked.");
  } catch (err) {
    next(err);
  }
};
