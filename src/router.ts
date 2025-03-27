import { Router } from "express";
import { createTaskValidator } from "./validators/task.validator";
import { createTask } from "./handlers/task.handler";
import { handleInputError } from "./middlewares/common.middleware";
import { getAllUser, getUserById } from "./handlers/user.handler";

const router = Router();

//User
router.get("/users", getAllUser);
router.get("/users/:id", getUserById);
//Task
router.get("/tasks", handleInputError, () => { });
router.get("/tasks/:id", handleInputError, () => { });
router.post("/tasks", createTaskValidator, handleInputError, createTask);
router.put("/tasks/:id", handleInputError, () => { });
router.delete("/tasks/:id", handleInputError, () => { });

//TaskAssignment
router.post("/tasks/:id/assign", handleInputError, () => { });
router.get("/tasks/:id/assignments", handleInputError, () => { });
router.delete("/tasks/:id/unasign/:userId", handleInputError, () => { });

//Comment
router.post("/tasks/:id/comments", handleInputError, () => { });
router.get("/tasks/:id/comments", handleInputError, () => { });
router.delete("/comments/:id", handleInputError, () => { });

export default router;
