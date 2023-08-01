import express from "express";
const router = express.Router();

import controllers from "../controllers/usersControllers.js";

router.get("/", controllers.getAll);

router.get("/:id", controllers.findUserById);

router.post("/", controllers.createUser);

router.patch("/:id", controllers.updateUserById);

router.delete("/:id", controllers.deleteUserById);

export default router;