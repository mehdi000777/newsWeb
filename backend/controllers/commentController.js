import Comment from '../models/commentModel.js';
import News from '../models/newsModel.js'
import asyncHandler from 'express-async-handler';

export const createComment = asyncHandler(async (req, res) => {
    const { text, newsId } = req.body;
    const userId = req.user._id;

    if (!text || !userId) res.status(400).json({ message: "all fields are required" });

    const newComment = new Comment({
        user: userId,
        text
    })

    await newComment.save();

    const updatedNews = await News.findByIdAndUpdate(newsId, { $push: { comments: newComment._id } }, { new: true })

    res.status(201).json(updatedNews)
})

export const editComment = asyncHandler(async (req, res) => {
    const { text } = req.body;
    const { id } = req.params;

    if (!text) res.status(400).json({ message: "text required" });

    const updatedComment = await Comment.findByIdAndUpdate(id, { text }, { new: true });

    res.status(200).json({ comment: updatedComment });
})

export const deleteComment = asyncHandler(async (req, res) => {
    const { newsId } = req.body;
    const { id } = req.params;

    await Comment.findByIdAndDelete(id);

    const updatedNews = await News.findByIdAndUpdate(newsId, { $pull: { comments: id } }, { new: true })

    res.status(200).json({ message: "comment deleted", news: updatedNews });
})