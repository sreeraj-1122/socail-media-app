import express from 'express'
import { createPost, deletePost, editPost, getPosts, getUserPost, likePost } from '../controllers/postController.js'
import upload from '../utils/multerConfig.js'
import verifyToken from './../middlewares/verifyToken.js';

const postRouter=express.Router()

postRouter.post('/create',upload.single('file'),verifyToken,createPost)
postRouter.delete('/delete/:id',verifyToken,deletePost)
postRouter.put('/edit/:id',verifyToken,editPost)
postRouter.post('/',verifyToken,getPosts)
postRouter.get('/userpost',verifyToken,getUserPost)
postRouter.get('/comments/:postId',verifyToken,getUserComments)
postRouter.get('/like/:id',verifyToken,likePost)

export default postRouter