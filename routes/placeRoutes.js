
import express from "express";
import {
  createPlace,
  getPlaces,
  getPlaceById,
  updatePlace,
  deletePlace,
} from "../controllers/placeController.js";

const router = express.Router();

router.post("/", createPlace);
router.get("/", getPlaces);
router.get("/:id", getPlaceById);
router.put("/:id", updatePlace);
router.delete("/:id", deletePlace);

export default router;
