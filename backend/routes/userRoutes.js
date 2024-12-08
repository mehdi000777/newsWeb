import express from "express";
import { isAdmin, verfiyJwt } from "../middlewares/verifyJwt.js";
import {
  deleteUser,
  editUser,
  getAllUsers,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", verfiyJwt, isAdmin, getAllUsers);
router.patch("/:id", verfiyJwt, isAdmin, editUser);
router.delete("/:id", verfiyJwt, isAdmin, deleteUser);

export default router;
