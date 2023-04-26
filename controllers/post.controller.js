import User from "../models/user.model.js";
import Post from "../models/post.models.js";

// create
export const createPost = async (req, res) => {
  try {
    const { id, description, picture } = req.body;
    const user = await User.findById(id);
    const newPost = new Post({
      userId: id,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicture: user.picture,
      picture,
      likes: {},
      comments: [],
    });
    await newPost.save();
    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// read

export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getUserPosts = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.find({ userId: id });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const likePosts = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(201).json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
