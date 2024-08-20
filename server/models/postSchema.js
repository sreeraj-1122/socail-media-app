import mongoose, { Schema } from 'mongoose';

const postSchema = new mongoose.Schema({
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    description: {
        type: String,
        required:true,
    },
    filePath: {
        type: String
    },
    likes: {
        type: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Comments'
    }],
   
}, {
    timestamps: true,
});



// Model for the post
const Posts = mongoose.models.Posts || mongoose.model('Posts', postSchema);

export default Posts;