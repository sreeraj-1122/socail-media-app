import express from 'express'
import { commentPost, createPost, deletePost, editPost, getComments, getPosts, getUserPost, likePost, likePostComment, replyPostComment } from '../controllers/postController.js'
import upload from '../utils/multerConfig.js'
import verifyToken from './../middlewares/verifyToken.js';

const postRouter=express.Router()

postRouter.post('/create',upload.single('file'),verifyToken,createPost)
postRouter.delete('/delete/:id',verifyToken,deletePost)
postRouter.put('/edit/:id',verifyToken,editPost)
postRouter.post('/',verifyToken,getPosts)
postRouter.get('/userpost',verifyToken,getUserPost)
postRouter.get('/comments/:postId',verifyToken,getComments)
postRouter.get('/like/:id',verifyToken,likePost)
postRouter.get('/likecomment/:id/:rid?',verifyToken,likePostComment)
postRouter.get('/comment/:id',verifyToken,commentPost)
postRouter.get('/replycomment/:id',verifyToken,replyPostComment)

export default postRouter