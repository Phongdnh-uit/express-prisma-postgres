import { Router } from "express";
import { createTaskValidator } from "./validators/task.validator";
import {
    createTask,
    deleteTask,
    getAllTask,
    getTaskById,
    updateTask,
} from "./handlers/task.handler";
import { handleInputError } from "./middlewares/common.middleware";
import { getAllUser, getUserById } from "./handlers/user.handler";
import {
    assignTask,
    getUsersInTask,
    unassignTask,
} from "./handlers/taskAssignment.handler";
import { body } from "express-validator";
import {
    addCommentToTask,
    deleteComment,
    getAllCommentInTask,
} from "./handlers/comment.handler";

const router = Router();

//User
router.get("/users", getAllUser);
router.get("/users/:id", getUserById);
//Task
router.get("/tasks", getAllTask);
router.get("/tasks/:id", getTaskById);
router.post("/tasks", createTaskValidator, handleInputError, createTask);
router.put("/tasks/:id", createTaskValidator, handleInputError, updateTask);
router.delete("/tasks/:id", handleInputError, deleteTask);

//TaskAssignment
router.post(
    "/tasks/:id/assign",
    body("userId").notEmpty(),
    handleInputError,
    assignTask,
);
router.get("/tasks/:id/assignments", getUsersInTask);
router.delete("/tasks/:id/unasign/:userId", unassignTask);

//Comment
router.post(
    "/tasks/:id/comments",
    body("comment").notEmpty(),
    handleInputError,
    addCommentToTask,
);
router.get("/tasks/:id/comments", handleInputError, getAllCommentInTask);
router.delete("/comments/:id", handleInputError, deleteComment);

export default router;
