import express from "express";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import { login, logout, join } from "../controllers/userController";

const globalRouter = express.Router();

// globalRouter.get(routes.home, (req, res) => res.send("Home"));
// globalRouter.get(routes.join, (req, res) => res.send("Join"));
// globalRouter.get(routes.login, (req, res) => res.send("Login"));
// globalRouter.get(routes.logout, (req, res) => res.send("Logout"));
// globalRouter.get(routes.search, (req, res) => res.send("Search"));
globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.join, join);
globalRouter.get(routes.login, login);
globalRouter.get(routes.logout, logout);

export default globalRouter;
