import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  categoryControlller,
  subCategoryControlller,
  createCategoryController,
  updateCategoryController,
  singleCategoryController,
  deleteCategoryController,
  singleCategoryWithSubCategoryController
} from "./../controllers/categoryController.js";

const router = express.Router();

//routes
// create category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//update category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

// //getALl category
router.get("/get-category", categoryControlller);

// //getALl category
router.post("/get-sub-category", subCategoryControlller);

// //single category
router.get("/single-category/:slug", singleCategoryController);

// //single category
router.get("/single-category/:slug/:sn", singleCategoryWithSubCategoryController);

// //delete category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;