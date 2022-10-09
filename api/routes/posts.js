import express from "express";
import {
  deletePostController,
  getPostController,
  insertPostController,
  updatePostController,
  getSinglePostById,
} from "../controller/posts.js";

const router = express.Router();

router.get("/", getPostController);
router.get("/", insertPostController);
router.get("/:id", getSinglePostById);
router.get("/:id", updatePostController);
router.get("/:id", deletePostController);

export default router;
