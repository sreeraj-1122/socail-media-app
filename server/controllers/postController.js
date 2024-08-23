import comments from "../models/commentSchema.js";
import User from "../models/userModel.js";
import Posts from './../models/postSchema.js';
import fs from 'fs'
//create post

const createPost = async (req, res, next) => {

    try {
        const { id: userId } = req.user;
        const { description } = req.body
        let filePath;
        if (req.file) {
          filePath = req.file.path;
        }



        if (!description) {
            return res.json({ success: false, message: "you must provide description" })
        }

        const newPost = new Posts({
            userId,
            description,
            filePath,
        })
        const post = await newPost.save()
        res.json({ success: true, message: "Post created successfully" })
    } catch (error) {
        next(error);
    }

}

//delete post

const deletePost = async (req, res, next) => {

    try {
        const deletePost = await Posts.findById(req.params.id);

        if (!deletePost) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Get the file path(s) associated with the post
        const filePath = deletePost.filePath;  // Assuming post contains filePath

        // Delete the file from the filesystem
        fs.unlink(filePath, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error deleting file from server' });
            }
        });

        // Delete the post from the database
        await Posts.findByIdAndDelete(req.params.id);

        res.json({ success: true, message: "Post deleted successfully" })
    } catch (error) {
        next(error);
    }

}
//edit post
const editPost = async (req, res, next) => {
    try {
      // Find the post by ID
      const editPost = await Posts.findById(req.params.id);
  
      if (!editPost) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      // Handle file replacement if a new file is uploaded
      if (req.file) {
        const oldFilePath = editPost.filePath; // Get the current file path from the post
  
        // Delete the old file if it exists
        if (oldFilePath) {
          fs.unlink(oldFilePath, (err) => {
            if (err) {
              console.error('Error deleting old file:', err);
            }
          });
        }
  
        // Set the new file path
        editPost.filePath = req.file.path;
      }
  
      // Update title and description if provided
      editPost.title = req.body.title || editPost.title;
      editPost.description = req.body.description || editPost.description;
  
      // Save the updated post
      await editPost.save();
  
      res.status(200).json({ message: 'Post updated successfully', post: editPost });
    } catch (error) {
      next(error); // Handle errors
    }
  };

//get posts
const getPosts = async (req, res, next) => {
    try {
      const { id: userId } = req.user;
      const { search } = req.body;
  
      // Find the user by ID and get their following list
      const user = await User.findById(userId);
      const following = user?.following?.map(follow => follow.toString()) || [];
      following.push(userId); // Include the user's own posts
  
      // Construct the search query
      const searchPostQuery = search
        ? { description: { $regex: search, $options: "i" } }
        : {};
  
      // Find posts, with an optional search term
      const posts = await Posts.find(searchPostQuery)
        .populate({
          path: "userId",
          select: "name location profile",
        })
        .sort({ _id: -1 });
  
      // Separate posts into friend posts and other posts
      const friendPosts = [];
      const otherPosts = [];
  
      posts.forEach(post => {
        if (following.includes(post?.userId?._id.toString())) {
          friendPosts.push(post);
        } else {
          otherPosts.push(post);
        }
      });
  
      // Combine posts based on search status
      const postsRes = search ? friendPosts : [...friendPosts, ...otherPosts];
  
      res.status(200).json({
        success: true,
        message: "Successful",
        data: postsRes,
      });
    } catch (error) {
      next(error);
    }
  };
  
const getUserPost = async (req, res, next) => {

    try {
        const { id: userId } = req.user;

        const post = await Posts.find({ userId }).populate({
            path: "userId",
            select: "name location profile "
        }).sort({ _id: -1 })


        res.status(200).json({
            success: true,
            message: "Successful",
            data: post

        })
    } catch (error) {
        next(error);
    }

}

//get coments
const getComments = async (req, res, next) => {

    try {
        const { postId } = req.params
        const postComments = await comments.find({ postId }).populate({
            path: "userId",
            select: "name location profile "
        }).sort({ _id: -1 }).populate({
            path: "replies.userId",
            select: "name location profile "
        }).sort({ _id: -1 })


        res.status(200).json({
            success: true,
            message: "Successful",
            data: postComments

        })
    } catch (error) {
        next(error);
    }

}
//like post
const likePost = async (req, res, next) => {
    try {
      const { id: userId } = req.user;
      const { id } = req.params;
  
      // Find the post by ID
      const post = await Posts.findById(id);
  
      if (!post) {
        return res.status(404).json({ success: false, message: "Post not found" });
      }
  
      // Ensure that the likes array is initialized
      if (!post.likes) {
        post.likes = [];
      }
  
      // Check if the user has already liked the post
      const hasLiked = post.likes.includes(String(userId));
  
      if (!hasLiked) {
        // If not liked, add the user's ID to the likes array
        post.likes.push(userId);
      } else {
        // If liked, remove the user's ID from the likes array
        post.likes = post.likes.filter((pid) => pid !== String(userId));
      }
  
      // Save the post with updated likes
      const updatedPost = await post.save();
  
      res.status(200).json({
        success: true,
        message: "Post like status updated successfully",
        data: updatedPost,
      });
    } catch (error) {
      next(error);
    }
  };
  
//like post comment
const likePostComment = async (req, res, next) => {
    try {
      const { id: userId } = req.user;
      const { id, rid } = req.params;
  
      // Handle the case where `rid` is not provided (like/unlike a main comment)
      if (!rid) {
        const comment = await comments.findById(id);
  
        if (!comment) {
          return res.status(404).json({ success: false, message: "Comment not found" });
        }
  
        // Toggle the like for the main comment
        const hasLiked = comment.likes.includes(String(userId));
  
        if (!hasLiked) {
          comment.likes.push(userId); // Like the comment
        } else {
          comment.likes = comment.likes.filter((i) => i !== String(userId)); // Unlike the comment
        }
  
        // Save the updated comment
        const updatedComment = await comment.save();
  
        return res.status(200).json({
          success: true,
          message: "Comment like status updated",
          data: updatedComment,
        });
      }
  
      // Handle the case where `rid` is provided (like/unlike a reply)
      const replyComment = await comments.findOne(
        { _id: id, "replies._id": rid },
        { "replies.$": 1 }
      );
  
      if (!replyComment || !replyComment.replies.length) {
        return res.status(404).json({ success: false, message: "Reply not found" });
      }
  
      // Toggle the like for the reply
      const reply = replyComment.replies[0];
      const hasLiked = reply.likes.includes(String(userId));
  
      if (!hasLiked) {
        reply.likes.push(userId); // Like the reply
      } else {
        reply.likes = reply.likes.filter((i) => i !== String(userId)); // Unlike the reply
      }
  
      // Update the likes array for the specific reply
      const result = await comments.updateOne(
        { _id: id, "replies._id": rid },
        { $set: { "replies.$.likes": reply.likes } }
      );
  
      return res.status(200).json({
        success: true,
        message: "Reply like status updated",
        result,
      });
    } catch (error) {
      next(error);
    }
  };
  

//commnetpost
const replyPostComment = async (req, res, next) => {
    try {
      const { id: userId } = req.user;
      const { id } = req.params;
      const { comment, from, replyAt } = req.body;
  
      // Ensure the comment content is provided
      if (!comment) {
        return res.status(400).json({ message: "Comment is required" });
      }
  
      // Find the original comment by ID
      const commentInfo = await comments.findById(id);
  
      if (!commentInfo) {
        return res.status(404).json({ message: "Comment not found" });
      }
  
      // Push the reply to the replies array of the comment
      commentInfo.replies.push({
        comment,
        userId,
        from,
        replyAt: replyAt || Date.now(), // Set replyAt to current time if not provided
        created_At: Date.now(),
      });
  
      // Save the updated comment with the new reply
      await commentInfo.save();
  
      // Return the updated comment
      res.status(200).json({ success: true, data: commentInfo });
    } catch (error) {
      next(error);
    }
  };
  
//commnetpost
const commentPost = async (req, res, next) => {

    try {
        const { id: userId } = req.user;
        const { id } = req.params
        const { comment, from } = req.body

        if (comment === null) {
            res.status(404).json({ message: "comment is required" })
        }
        const newComment = new comments({
            comment, from, userId, postId: id
        })
        await newComment.save()

        const post = await Posts.findById(id)
        post.comments.push(newComment._id)
        const updatedPost = await Posts.findByIdAndUpdate(id, post, {
            new: true
        })
        res.status(200).json({ data: updatedPost })


    } catch (error) {
        next(error);
    }

}


export { createPost, deletePost, editPost, getPosts, getUserPost, getComments, likePost, likePostComment, commentPost, replyPostComment }