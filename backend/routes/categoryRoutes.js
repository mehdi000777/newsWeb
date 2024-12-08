import express from 'express';
import { createCategory, deleteCategory, editCategory, getAllCategorys } from '../controllers/categoryController.js';
import { isAdmin, verfiyJwt } from '../middlewares/verifyJwt.js';

const router = express.Router();

router.get("/", getAllCategorys);
router.post("/", verfiyJwt, isAdmin, createCategory);
router.put("/:id", verfiyJwt, isAdmin, editCategory);
router.delete("/:id", verfiyJwt, isAdmin, deleteCategory);

export default router;