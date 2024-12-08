import express from 'express';
import { createNews, deleteNews, editNews, editVisitNews, getAllNews, getLatestNews, getNewsByCategory, getNewsById, getPopularNews, getVisitedNews, likeNews, sliderNews } from '../controllers/newsController.js';
import { isAdmin, verfiyJwt } from '../middlewares/verifyJwt.js';

const router = express.Router();

router.get("/slider", sliderNews);
router.get("/", getAllNews);
router.get("/popular", getPopularNews);
router.get("/visited", getVisitedNews);
router.get("/Latest", getLatestNews);
router.get("/:id", getNewsById);
router.post("/", verfiyJwt, isAdmin, createNews);
router.put("/:id", verfiyJwt, isAdmin, editNews);
router.delete("/:id", verfiyJwt, isAdmin, deleteNews)
router.patch("/:id/like", verfiyJwt, likeNews);
router.patch("/:id/visit", editVisitNews);
router.get("/category/:category_id", getNewsByCategory)

export default router;