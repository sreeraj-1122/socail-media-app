import comments from "../models/commentSchema.js";
import User from "../models/userModel.js";
import Posts from './../models/postSchema.js';
//create post

const createPost = async (req, res, next) => {

    try {
        const { userId } = req.user
        const { description } = req.body
        const filePath = req.file.path;

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
        const editPost = await Posts.findById(req.params.id);

        if (!editPost) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Get the file path(s) associated with the post
        // If a new file is uploaded, replace the old file
        if (req.file) {
            const oldFilePath = Posts.filePath;

            // Delete the old file if it exists
            fs.unlink(oldFilePath, (err) => {
                if (err) {
                    console.error('Error deleting old file:', err);
                }
            });

        }
        Posts.title = req.body.title || Posts.title;
        Posts.description = req.body.description || Posts.description;

        // Save the updated post
        await Posts.save();
        res.status(200).json({ message: 'Post updated successfully', Posts });
    } catch (error) {

        next(error);
    }

}

//get posts
const getPosts = async (req, res, next) => {

    try {
        const { userId } = req.user
        const { search } = req.body
        const user = await User.findById(userId);
        const following = user?.following?.toString().split(',') ?? [];
        following.push(userId)

        const searchPostQuery = {
            $or: [
                {
                    description: { $regex: search, $options: "i" },
                }
            ],
        }
        const posts = await Posts.find(search ? searchPostQuery : {}).populate({
            path: "userId",
            select: "name location profile "
        }).sort({ _id: -1 })

        const friendPosts = posts?.filter((post) => {
            return following.includes(post?.userId?._id.toString())
        })
        const otherPosts = posts?.filter((post) => following.includes(
            post?.userId?._id.toString())
        )

        let postsRes = null;
        if (friendPosts?.length > 0) {
            postsRes = search ? friendPosts : [...friendPosts, ...otherPosts]
        } else {
            postsRes = posts
        }
        res.status(200).json({
            success: true,
            message: "Successful",
            data: postsRes

        })
    } catch (error) {
        next(error);
    }

}
const getUserPost = async (req, res, next) => {

    try {
        const { userId } = req.user
        const { search } = req.body

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
        const { postId } = req.body


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
        const { userId } = req.user
        const { id } = req.params
        const post = await Posts.findById(id)
        const index = post.likes.findeIndex((pid) => pid === String(userId));
        if (index===-1) {
            post.likes.push(userId)
        }else{
            post.likes=post.likes.filter((pid) => pid !== String(userId));

        }
        const newPost=await Posts.findByIdAndUpdate(id,post,{
            new:true,
        })

     
        res.status(200).json({
            success: true,
            message: "Successful",
            data: newPost

        })
    } catch (error) {
        next(error);
    }

}

export { createPost, deletePost, editPost, getPosts, getUserPost, getComments, likePost }