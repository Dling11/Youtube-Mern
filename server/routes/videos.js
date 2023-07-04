import express from "express";
import { addVideo, addView, deleteVideo, getByTag, getVideo, random, search, sub, trend, updateVideo } from "../controllers/video.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

// add video
router.post("/", verifyToken, addVideo);

// updateVideo video
router.put("/:id", verifyToken, updateVideo);

// deleteVideo video
router.delete("/:id", verifyToken, deleteVideo);

// getVideo video
router.get("/find/:id", getVideo);

// will increment watch videos
router.put("/view/:id", addView);

//trending videos
router.get("/trend", trend)

// random vidoes
router.get("/random", random);

// getAll Subscribers
router.get("/sub", verifyToken, sub)

// getAll tags
router.get("/tags", getByTag)

// getAll search
router.get("/search", search)

export default router;