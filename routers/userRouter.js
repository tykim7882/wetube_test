import express from "express";
import routes from "../routes";
import {
  userDetail,
  editProfile,
  changePassword,
} from "../controllers/userController";

const userRouter = express.Router();

// userRouter.get(routes.users, users);
// :id 로 인해 경로를 id로 인식하는 경우 발생하므로 순서가 중요하다.
userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.userDetail, userDetail);

export default userRouter;
