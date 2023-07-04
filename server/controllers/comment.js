import { createError } from "../utils/error.js";
import Comment from "../models/Comment.js";
import Video from "../models/Video.js";


// Add comment | post method | don't worry about not login user | take take this has VerifyToken
export const addComment = async (req, res, next) => {       // Comment.js model UserId
  const newComment = new Comment({ ...req.body, userId: req.user.id }); // take note that in ...req.body "videoId" must be included //==>
  try {                                                       // which is refer to model Comment.js => three of them is required
    const savedComment = await newComment.save();
    res.status(200).send(savedComment);
  } catch (err) {
    next(err);
  }
};

// get Comments | delete method
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(res.params.id);
    const video = await Video.findById(res.params.id);

    if (req.user.id === comment.userId || req.user.id === video.userId) { // this condition will allow you and the owner, basically anyone can //==
      await Comment.findByIdAndDelete(req.params.id);                     //==> delete his "own" comment
      res.status(200).json("The Comment has been deleted.");
    } else {
      return next(createError(403, "You can delete only your comment!"));
    }
  } catch (err) {
    next(err);
  }
};

// Get all comments | get method
export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });     // videoId is already located at routes /videoId
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};

