import mongoose, { Schema } from 'mongoose';

const commentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Posts' },
    comment: {
        type: String,
        required: true,
    },
    from: {
        type: String,
        required: true,
    },
    replies: [
        {
            rid: { type: mongoose.Schema.Types.ObjectId },
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            from: {
                type: String
            },
            replyAt: {
                type: String
            },
            comment: {
                type: String
            },
            created_At: { type: Date, default: Date.now() },
            updated_At: { type: Date, default: Date.now() },

            likes: [{
                type: String,
            }],


        }
    ],
    likes: [{
        type: String,
    }],

}, {
    timestamps: true,
});



// Model for the post
const comments = mongoose.models.Comments || mongoose.model('Comments', commentSchema);

export default comments;