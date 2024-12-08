import mongoose from "mongoose";

const commentShema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: { type: String, required: true }
}, { timestamps: true })

const Comment = mongoose.model("Comment", commentShema);

export default Comment;