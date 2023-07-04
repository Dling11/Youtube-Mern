import express from "express";
import { addComment, deleteComment, getComments } from "../controllers/comment.js";
import {verifyToken} from "../utils/verifyToken.js"
const router = express.Router();

// addComment
router.post("/", verifyToken, addComment)

// delete comments
router.delete("/:id", verifyToken, deleteComment)

// get All Comments
router.get("/:videoId", getComments)

export default router;
