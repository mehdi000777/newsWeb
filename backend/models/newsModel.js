import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    coverImage: { type: String, required: true },
    thumbnale: { type: String, required: true },
    text: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    visit: { type: Number, default: 0 },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    slider: { type: Boolean, default: false }
}, { timestamps: true })

const News = mongoose.model("News", newsSchema);

export default News;