import {Router} from "express";

import { registerUser,loginUser,logoutuser } from "../controllers/user.controller.js";

import { verifyJWT } from "../Middlewares/auth.middlewares.js";

import {upload} from "../Middlewares/multer.middleware.js"

const router=Router()

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },{
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser)


router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT,logoutuser)

export default router