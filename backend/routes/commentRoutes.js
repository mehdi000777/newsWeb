import express from 'express';
import { createComment, deleteComment, editComment } from '../controllers/commentController.js';
import { verfiyJwt } from '../middlewares/verifyJwt.js';

const router = express.Router();

router.post("/", verfiyJwt, createComment);
router.put("/:id", verfiyJwt, editComment);
router.delete("/:id", verfiyJwt, deleteComment);

export default router;