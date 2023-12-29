const postMessage = require("../models/postModel");

exports.getPosts = async (req, res) => {
  try {
    const postMessages = await postMessage.find();
    res.status(200).json(postMessages);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.createPost = async (req, res) => {
  const post = req.body;

  try {
    const newPost = await postMessage.create({
      ...post,
      creator: req.userId,
      createdAt: new Date().toISOString(),
    });

    // res.status(201).json({
    //   status: "success",
    //   newPost,
    // });

    res.status(201).json(newPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

exports.updatePost = async (req, res) => {
  const { id: _id } = req.params;
  console.log(_id);
  const newPost = req.body;

  const post = await postMessage.findByIdAndUpdate(
    _id,
    { ...newPost, _id },
    {
      new: true,
    }
  );

  if (!post) return res.status(404).send("no post with this Id");

  res.status(200).json(post);
};

exports.deletePost = async (req, res) => {
  const post = await postMessage.findByIdAndDelete(req.params.id);

  if (!post) res.status(404).send("No post with this Id");

  res.status(204).json({ message: "Post Deleted Successfully" });
};

exports.likePost = async (req, res) => {
  const { id } = req.params;

  const post = await postMessage.findById(id);

  if (!req.userId) return res.json({ message: "unauthorized user, sign in" });

  if (!post) res.status(404).send("No post with this ID");

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updateLikePost = await postMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.status(200).json(updateLikePost);
};
