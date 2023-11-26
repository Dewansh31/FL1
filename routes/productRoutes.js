import express from "express";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  updateProductController,
  searchProductController,
  realtedProductController,
  productCategoryController,
  braintreeTokenController,
  brainTreePaymentController,
  productsubCategoryController,
  createBannerController,
  getBannerController,
  bannerPhotoController
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

router.post(
  "/create-banner",
  requireSignIn,
  isAdmin,
  formidable(),
  createBannerController
);

//routes
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get products
router.get("/get-product", getProductController);

router.get("/get-banners", getBannerController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

router.get("/banner-photo/:pid", bannerPhotoController);

//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

// search product
router.get("/search/:keyword", searchProductController);

// similar product 
router.get('/related-product/:pid/:cid',realtedProductController);

// category wise product
router.get('/product-category/:slug',productCategoryController);

// sub category wise product
router.get('/product-category/code/:slug/:sn',productsubCategoryController);

// payments routes
// token
router.get('/braintree/token',braintreeTokenController);

// payments
router.post('/braintree/payment',requireSignIn,brainTreePaymentController);

export default router;