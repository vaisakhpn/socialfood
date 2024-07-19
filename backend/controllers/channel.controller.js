import Channel from "../models/channel.model.js";
import Video from "../models/video.model.js";
import { errorHandler } from "../middleware/error.js";

export const createChannel = async (req, res, next) => {
  const { channelName, address, pinCode, gpayId, imgUrl } = req.body;

  try {
    const newChannel = new Channel({
      userId: req.user.id,
      channelName,
      address,
      pinCode,
      gpayId,
      imgUrl,
    });

    const savedChannel = await newChannel.save();
    res.status(201).json(savedChannel);
  } catch (error) {
    next(error);
  }
};
const calculateChannelStats = async (channelId) => {
  const videos = await Video.find({ channelId });
  const totViews = videos.reduce((acc, video) => acc + video.views, 0);
  const totLikes = videos.reduce((acc, video) => acc + video.likes.length, 0);
  const totDislikes = videos.reduce(
    (acc, video) => acc + video.dislikes.length,
    0
  );

  return { totViews, totLikes, totDislikes };
};

export const getChannelDetails = async (req, res, next) => {
  try {
    const channel = await Channel.findById(req.params.id).populate(
      "userId",
      "email"
    );
    if (!channel) return next(errorHandler(404, "Channel not found!"));
    const { totViews, totLikes, totDislikes } = await calculateChannelStats(
      channel._id
    );

    res.status(200).json({
      ...channel._doc,
      email: channel.userId.email,
      totViews,
      totLikes,
      totDislikes,
      subscribers: channel.subscribers,
    });
  } catch (err) {
    next(err);
  }
};

export const updateChannel = async (req, res, next) => {
  try {
    const channel = await Channel.findById(req.params.id);
    if (!channel) return next(errorHandler(404, "Channel not found!"));
    if (channel.userId.toString() !== req.user.id)
      return next(errorHandler(403, "You can update only your own channel!"));

    const { channelName, address, pinCode, gpayId, imgUrl } = req.body;

    const updatedChannel = await Channel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          channelName,
          address,
          pinCode,
          gpayId,
          imgUrl,
        },
      },
      { new: true }
    );

    res.status(200).json(updatedChannel);
  } catch (error) {
    next(error);
  }
};
