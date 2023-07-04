import { createError } from "../utils/error.js";
import Video from "../models/Video.js";
import User from "../models/User.js";

// getUser | get
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    // if(!user) return next(createError(404, "User not Found")); // be careful on creating using unnecessary condition, might be preventing in //===
    res.status(200).json(user);                                           //===> your Frontend to get some data
  } catch (err) {
    next(err);
  }
}

// updateUser | put
export const update = async (req, res, next) => {
  if(req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set:req.body      
      },
        { new: true }       // will show directly to the frontend
      );
      res.status(200).json(updatedUser)
    } catch (err) {
      next(err)
    }
  } else {
    return next(createError(403, "You can update only your account you hacker!"));
  }
}

// deleteUser | delete
export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted.");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can delete only your account you hacker!"));
  }
};

// subscribe | put
export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {         // to make you remember "req.user.id" was created at the verifyToken
      $push: { subscribedUsers: req.params.id },   // The reason we need to push or store the subUsers || because we need some unSubcribed
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },                   // mongoDb method => incrementing subscribers | check models
    });
    res.status(200).json("Subscription successfull.")
  } catch (err) {
    next(err);
  }
};

// unsubscribe | put
export const unsubscribe = async (req, res, next) => {
  try {
    try {
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { subscribedUsers: req.params.id },  // pull or get rid of the id
      });
      await User.findByIdAndUpdate(req.params.id, { // deduct the subcribe
        $inc: { subscribers: -1 },
      });
      res.status(200).json("Unsubscription successfull.")
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

// Like a video | put method
export const like = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId,{
      $addToSet: { likes:id },      // $addToSet is very useful method in mongoDb, which will only add the ID in the array "ONCE"
      $pull: { dislikes:id }        // $pull will be a functionality that pull the dislikes: id
    })
    res.status(200).json("The video has been liked.")
  } catch (err) {
    next(err);
  }
};

// dislike a video | put method
export const dislike = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId,{
      $addToSet:{ dislikes:id },                     // just the opposite of like
      $pull:{ likes:id }
    })
    res.status(200).json("The video has been disliked.")
} catch (err) {
  next(err);
}
};
