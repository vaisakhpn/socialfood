import express from "express";
import {
  createChannel,
  getChannelDetails,
  updateChannel,
} from "../controllers/channel.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createChannel);
router.get("/:id", getChannelDetails);
router.put("/:id", verifyToken, updateChannel);
export default router;
