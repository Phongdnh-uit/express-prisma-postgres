import { body } from "express-validator"

const status = [
  "PENDING",
  "IN_PROGRESS",
  "COMPLETED"
]


export const createTaskValidator = [
    body("title").notEmpty().withMessage("Title can not be empty"),
    body("status").isIn(status).withMessage("status is not correct")
]


