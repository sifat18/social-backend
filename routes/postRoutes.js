import express from "express";
import { verifyToken } from "../middlewears/authMiddlewear.js";
import {
  getFeedPosts,
  getUserPosts,
  likePosts,
} from "../controllers/post.controller.js";
const router = express.Router();

// read
router.get("/", verifyToken, getFeedPosts);
router.get("/:id/posts", verifyToken, getUserPosts);
// update
router.get("/:id/like", verifyToken, likePosts);
export default router;
