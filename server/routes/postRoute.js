import express from 'express'
import { commentPost, createPost, deletePost, editPost, getComments, getPosts, getUserPost, likePost, likePostComment, replyPostComment } from '../controllers/postController.js'
import upload from '../utils/multerConfig.js'
import verifyToken from './../middlewares/verifyToken.js';

const postRouter=express.Router()

postRouter.post('/create',verifyToken,upload.single('filePath'),createPost)
postRouter.delete('/delete/:id',verifyToken,deletePost)
postRouter.put('/edit/:id',verifyToken,upload.single('file'),editPost)
postRouter.get('/',verifyToken,getPosts)
postRouter.post('/userpost',verifyToken,getUserPost) 
postRouter.get('/comments/:postId',verifyToken,getComments)
postRouter.post('/like/:id',verifyToken,likePost)
postRouter.post('/likecomment/:id/:rid?',verifyToken,likePostComment)
postRouter.post('/comment/:id',verifyToken,commentPost)
postRouter.post('/replycomment/:id',verifyToken,replyPostComment)

export default postRouter