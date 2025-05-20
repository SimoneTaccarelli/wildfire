import {Router} from 'express';
import * as authController from '../controllers/auth.controller.js';


const router = Router();

router.post("/register", authController.freshRegister);
router.get("/me",authController.verifyToken, authController.getUserData);
router.post("/login", authController.loginStandard,);
router.post("/login-goole",authController.loginGoogle);
router.put("/modifyUser", authController.verifyToken, authController.updateUser);
router.delete("/cancelUser", authController.verifyToken, authController.eliminateUser);

export default router;