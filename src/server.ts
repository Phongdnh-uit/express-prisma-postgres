import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./router";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200);
  res.json({ message: "Hello" });
});

app.use("/api", protect, router);

app.post("/users/register", createNewUser);
app.post("/users/login", signin);

export default app;
