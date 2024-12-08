import mongoose from "mongoose";
import News from "../models/newsModel.js";
import asyncHandler from "express-async-handler";

export const sliderNews = asyncHandler(async (req, res) => {
  const news = await News.find({ slider: true }).limit(4).sort("-createdAt").lean().exec();

  res.status(200).json(news);
});

export const getAllNews = asyncHandler(async (req, res) => {
  const page = Number(req.query.page);
  const limit = Number(req.query.pageSize);
  const search = req.query.search;
  const searchParam = req.query.searchParam;

  const Data = await News.aggregate([
    {
      $facet: {
        totalData: [
          {
            $match: !search
              ? {}
              : {
                  [searchParam]:
                    searchParam === "category"
                      ? new mongoose.Types.ObjectId(search)
                      : { $regex: search, $options: "i" },
                },
          },
          { $sort: { createdAt: -1 } },
          { $skip: page  * limit },
          { $limit: limit },
        ],
        totalCount: [
          {
            $match: !search
              ? {}
              : {
                  [searchParam]:
                    searchParam === "category"
                      ? new mongoose.Types.ObjectId(search)
                      : { $regex: search, $options: "i" },
                },
          },
          { $count: "count" },
        ],
      },
    },
    {
      $project: {
        count: { $arrayElemAt: ["$totalCount.count", 0] },
        totalData: 1,
      },
    },
  ]);

  const news = Data[0].totalData;
  const count = Data[0].count;

  // Pagination
  let pageCount = 0;

  if (count % limit === 0) {
    pageCount = count / limit;
  } else {
    pageCount = Math.floor(count / limit) + 1;
  }

  const total = await News.countDocuments();

  res.status(200).json({ news, pageCount, total });
});

export const getLatestNews = asyncHandler(async (req, res) => {
  const news = await News.find({}).sort("-createdAt").limit(4);

  res.status(200).json(news);
});

export const getPopularNews = asyncHandler(async (req, res) => {
  const data = await News.aggregate([
    {
      $project: {
        news: "$$ROOT",
        _id: 0,
        likes_count: { $size: { $ifNull: ["$likes", []] } },
      },
    },
    {
      $sort: { likes_count: -1 },
    },
    {
      $project: { likes_count: 0 },
    },
  ]).limit(10);

  const newData = data.map((item) => {
    const news = item.news;

    return news;
  });

  res.status(200).json(newData);
});

export const getNewsByCategory = asyncHandler(async (req, res) => {
  const { category_id } = req.params;

  const news = await News.find({ category: category_id })
    .sort("-createdAt")
    .limit(10);

  res.status(200).json(news);
});

export const getVisitedNews = asyncHandler(async (req, res) => {
  const news = await News.find({}).sort("-visit").limit(10);

  res.status(200).json(news);
});

export const getNewsById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const news = await News.findById(id)
    .populate("comments category")
    .populate({
      path: "comments",
      select: "",
      populate: {
        path: "user",
        select: "-password",
      },
    });

  res.status(200).json(news);
});

export const createNews = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    coverImage,
    thumbnale,
    text,
    categoryId,
    slider,
  } = req.body;

  if (
    !title ||
    !description ||
    !coverImage ||
    !thumbnale ||
    !text ||
    !categoryId
  )
    return res.status(400).json({ message: "All fields are required" });

  const newNews = new News({
    title,
    description,
    coverImage,
    thumbnale,
    text,
    category: categoryId,
    slider,
  });

  const createdNews = await newNews.save();

  const fullNews = await createdNews.populate("category");

  res.status(201).json({ news: fullNews });
});

export const editNews = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    coverImage,
    thumbnale,
    text,
    categoryId,
    slider,
  } = req.body;

  const { id } = req.params;

  const updatedNews = await News.findByIdAndUpdate(
    id,
    {
      title,
      description,
      coverImage,
      thumbnale,
      text,
      category: categoryId,
      slider,
    },
    { new: true }
  ).populate("category");

  res.status(200).json({ news: updatedNews });
});

export const likeNews = asyncHandler(async (req, res) => {
  const { type } = req.body;

  const { id } = req.params;

  let updatedNews;

  if (type === "like")
    updatedNews = await News.findByIdAndUpdate(
      id,
      { $push: { likes: req.user._id } },
      { new: true }
    );
  else
    updatedNews = await News.findByIdAndUpdate(
      id,
      { $pull: { likes: req.user._id } },
      { new: true }
    );

  res.status(200).json({ message: "Update Success", news: updatedNews });
});

export const editVisitNews = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updatedNews = await News.findByIdAndUpdate(
    id,
    { $inc: { visit: 1 } },
    { new: true }
  );

  res.status(200).json({ message: "Update Success", news: updatedNews });
});

export const deleteNews = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await News.findByIdAndDelete(id);

  res.status(200).json({ message: "news deleted" });
});
