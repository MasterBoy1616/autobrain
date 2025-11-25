import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { instantAnalyze, predict60Days, listAnalyses } from "../controllers/analysisController";

const router = Router();

// These endpoints accept JWT but also accept userId in body for quick testing.
router.post("/instant-analyze", authMiddleware, instantAnalyze);
router.post("/predict-60days", authMiddleware, predict60Days);
router.get("/analyses", authMiddleware, listAnalyses);

export default router;