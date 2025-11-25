import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth";
import analysisRoutes from "./routes/analyses";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => res.send({ ok: true, name: "AutoBrain API" }));

app.use("/api/auth", authRoutes);
app.use("/api", analysisRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`AutoBrain backend listening on http://localhost:${port}`);
});