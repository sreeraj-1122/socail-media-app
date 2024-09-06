import express from 'express'
import { acceptRequest, friendRequest, getFriendRequest, getUser, loginUser, profileViews, registerUser, suggestedFriends, updateUser } from '../controllers/userController.js'
import verifyToken from './../middlewares/verifyToken.js';
import upload from './../utils/multerConfig.js';

const userRouter=express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/getuser/:id?',verifyToken,getUser)
userRouter.put('/updateuser',verifyToken,upload.single('profile'),updateUser)

//friend requiest 
userRouter.post('/friendrequest',verifyToken,friendRequest)
userRouter.post('/getfriendrequest',verifyToken,getFriendRequest)
userRouter.post('/acceptrequest',verifyToken,acceptRequest)
userRouter.post('/views',verifyToken,profileViews)
userRouter.post('/suggestedfriend',verifyToken,suggestedFriends)


export default userRouter