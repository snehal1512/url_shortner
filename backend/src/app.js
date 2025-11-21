import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import dotenv from "dotenv";
import urlRoutes from "./routes/urlRoutes.js";
import { redirectToUrl } from "./controllers/urlController.js";
import authRoutes from "./routes/authRoutes.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/url",urlRoutes);
app.use("/api",router);
app.use("/api/auth", authRoutes);

app.get("/",(req,res) => {
    res.send("URL Shortner backend running..");
});

app.get("/:shortCode", redirectToUrl);

export default app;
