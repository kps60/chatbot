import { Router } from "express"
import { getAllUsers, userLogin, userSignup, verifyUser } from "../controllers/users-controller.js"
import { loginValidator, signUpValidator, validate } from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signUpValidator), userSignup)
userRoutes.post("/login", validate(loginValidator), userLogin)
userRoutes.get("/auth-status", verifyToken, verifyUser)
export default userRoutes