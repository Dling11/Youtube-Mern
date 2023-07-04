import { createError } from "../utils/error.js";
import Video from "../models/Video.js";
import User from "../models/User.js";

// add video || post method
export const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body }); // created on userId | Video.js
  try {
    const savedVideo = await newVideo.save();
    res.status(201).json(savedVideo);
  } catch (err) {
    next(err);
  }
};

// updateVideo|| put method
export const updateVideo = async (req, res, next) => {
  try {
    // check for video
    const video = await Video.findById(req.params.id);
    if(!video) return next(createError(404, "Video Not Found...!"))

    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedVideo);
    } else {
      return next(createError(403, "You can update only your video!"));
    }
  } catch (error) {
    next(err);
  }
}

// deleteVideo || delete method
export const deleteVideo = async (req, res, next) => {
  try {
    // check for video
    const video = await Video.findById(req.params.id);
    if(!video) return next(createError(404, "Video Not Found...!"))
    // check for current id & it's vidId
    if(req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id)
      res.status(200).json("The video has been deleted");
    } else {
      return next(createError(403, "You can delete only your video!"));
    }
  } catch (error) {
    next(err);
  }
}

// getVideo || get method
export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};

// video views | get
export const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },                 // increment views
    });
    res.status(200).json("The view has been increased.");
  } catch (err) {
    next(err);
  }
};

// Show random videos | mongoDb aggregate() method
export const random = async (req, res, next) => {
  try {
    const videos = await Video.aggregate(
      [{ $sample: { size: 40 } }]     // mongoDb aggregate() method , it's concept is return some random samples - size of 40 vids in theory
    );
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

// trend | get method | defends of the most views
export const trend = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });  // take note if sending -1 means most views & if 1 the less video
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

//  Subcribe | get method | return all subscribedUsers at the User.js or mongoDb
export const sub = async (req, res, next) => {
  try {                                   // take note that in routes that verify token is existed, so by means it will check for req.user.id
    const user = await User.findById(req.user.id);  
    const subscribedChannels = user.subscribedUsers;      // return only the subcribedUsers

    const list = await Promise.all(
      subscribedChannels.map(async (channelId) => { // take note that at the User.js it has a subscribedUsers
        return await Video.find({ userId: channelId });   // check Video userId
      })
    );
          // flat() have a big role here, because it will return only one array, if not implemented data will return two array.
    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));  // flat() reduce nesting of array
  } catch (err) {              // the sort method just simply means reverse order newest must be first not last
    next(err);
  }
};

// getByTag | get method
export const getByTag = async (req, res, next) => {
  const tags = req.query.tags.split(","); // ex. http://localhost:9000/api/videos/tags?tags=js,python,porn = js, python, porn => use console.log
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20); // $in method return all "tags" | it's important to limit it to 20
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

//  search | get method
export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({   // this interface is so cool lel :D
      title: { $regex: query, $options: "i" }, // $regex return matching strings in queries, also $options: "i" will return even it uppercase or lowercase
    }).limit(40);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};