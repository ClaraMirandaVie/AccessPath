
import express from "express";
import { createComment, getComments, deleteComment } from "../controllers/commentController.js";

const router = express.Router();

router.post("/", createComment);
router.get("/", getComments); // aceita ?placeId=ID
router.delete("/:id", deleteComment);

export default router;
