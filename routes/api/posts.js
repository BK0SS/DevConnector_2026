const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
//@desc post to api/posts,
// @access Private
router.post(
  "/",
  auth,
  check("text", "Text is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// get to api/posts
// to get all posts
// private

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// api/posts/:id
// get psot by id
// private
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// delete to api/posts/:id
// delete a post
// private

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await post.deleteOne();

    res.json({ msg: "Post removed" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//put request api/posssts/like/:id
//like a post

router.put("/likes/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //check if post has been liked by the current user

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    res.status(500).send("server error");
  }
});

//put request api/posssts/unlike/:id
//unlike a post

router.put("/unlikes/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //check if post has been liked by the current user

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length ===0) {
      return res.status(400).json({ msg: "Post has not been liked" });
    }
    const removeIndex = post.likes.map(like => like.user.toString().indexOf(req.user.id));
    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch (err) {
    res.status(500).send("server error");
  }
});

//comment POST api/posts/comment/:id

router.post(
  "/comment/:id",
  auth,
  check("text", "Text is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const post = await Post.findById(req.params.id);
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//delete api/posts/comment/:id/:comment_id
//delete comment
router.delete('/comment/:id/:comment_id', auth, async (req,res) =>{
try {
    const post = await Post.findById(req.params.id);

    const comment = post.comments.find(comment => comment.id === req.params.comment_id);

    if(!comment)
    {
        return res.status(404).json({msg: "does not exist"});
    }

    //check user

    if(comment.user.toString() !== req.user.id)
    {
        return res.status(401).json({msg:"user not authorized"});
    }
    const removeIndex = post.comments.map(comment => comment.user.toString().indexOf(req.user.id));
    post.comments.splice(removeIndex,1);
    await post.save();
    res.json(post.comments);

} catch (err) {
    console.error(err.message);
      res.status(500).send("Server Error");
}
});

module.exports = router;
