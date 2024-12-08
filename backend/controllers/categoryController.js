import Category from "../models/categoryModel.js";
import asyncHandler from "express-async-handler";

export const getAllCategorys = asyncHandler(async (req, res) => {
    const categorys = await Category.find({}).lean().exec();

    return res.status(200).json(categorys);
})

export const createCategory = asyncHandler(async (req, res) => {
    const { title } = req.body;

    const category = await Category.findOne({ title }).lean().exec();
    if (category) return res.status(400).json({ message: "category existe" });

    const newCategory = new Category({
        title
    })

    await newCategory.save();

    res.status(200).json({ message: "category created", category: newCategory });
})

export const editCategory = asyncHandler(async (req, res) => {
    const { title } = req.body;
    const { id } = req.params;

    const updatedCategory = await Category.findOneAndUpdate({ _id: id }, { title }, { new: true });

    if (!updatedCategory) return res.status(400).json({ message: "not found" });

    res.status(201).json({ message: "category updated", category: updatedCategory });
})

export const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;

    await Category.findByIdAndDelete(id);

    res.status(201).json({ message: "category deleted" });
})