import mongoose, { Schema } from 'mongoose';

const requestSchema = new mongoose.Schema({
    requestTo:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    requestFrom:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    requestStatus:{ type: String,default: "Pending" },
    
   
}, {
    timestamps: true,
});



// Model for the post
const FriendRequest = mongoose.models.FriendRequest || mongoose.model('FriendRequest', requestSchema);

export default FriendRequest;