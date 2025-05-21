import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import multer from "multer";
import { productUpload } from "../utilities/cloudinary.js";

const router = Router();

router.post("/createProduct")