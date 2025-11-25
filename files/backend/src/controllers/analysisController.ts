import { Request, Response } from "express";
import prisma from "../prismaClient";
import { AuthedRequest } from "../middleware/auth";

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const instantAnalyze = async (req: AuthedRequest, res: Response) => {
  const { userId: bodyUserId, carId, audioUrl } = req.body;
  const userId = req.user?.id || bodyUserId;
  if (!userId || !carId) return res.status(400).json({ error: "userId and carId required" });

  // Simulate processing
  await delay(2000 + Math.floor(Math.random() * 1000));

  // Mock analysis
  const healthScore = Math.floor(randomBetween(40, 95));
  const riskLevel = healthScore > 75 ? "Düşük" : healthScore > 50 ? "Orta" : "Yüksek";
  const possibleFaults = [
    { name: "Enjektör dengesiz çalışması", probability: Number((Math.random() * 0.5 + 0.2).toFixed(2)) },
    { name: "Triger gerginlik sesi", probability: Number((Math.random() * 0.4 + 0.1).toFixed(2)) }
  ];
  const estimatedCostMin = Math.floor(randomBetween(500, 5000));
  const estimatedCostMax = estimatedCostMin + Math.floor(randomBetween(500, 8000));

  const created = await prisma.analysis.create({
    data: {
      userId,
      carId,
      type: "INSTANT",
      audioUrl: audioUrl || "local://dummy-audio",
      healthScore,
      riskLevel,
      possibleFaults,
      estimatedCostMin,
      estimatedCostMax
    }
  });

  res.json({
    healthScore,
    riskLevel,
    possibleFaults,
    estimatedCostMin,
    estimatedCostMax,
    createdAt: created.createdAt
  });
};

export const predict60Days = async (req: AuthedRequest, res: Response) => {
  const { userId: bodyUserId, carId, lastAnalysisId } = req.body;
  const userId = req.user?.id || bodyUserId;
  if (!userId || !carId) return res.status(400).json({ error: "userId and carId required" });

  await delay(2000 + Math.floor(Math.random() * 1000));

  const riskPercentage = Number((Math.random() * 0.6).toFixed(2)); // 0-0.6
  const riskLevel = riskPercentage < 0.25 ? "Düşük" : riskPercentage < 0.5 ? "Orta" : "Yüksek";
  const predictedIssues = [
    { name: "Turbo yorgunluğu", probability: Number((Math.random() * 0.3 + 0.1).toFixed(2)) },
    { name: "Enjektör aşınması", probability: Number((Math.random() * 0.25 + 0.08).toFixed(2)) }
  ];
  const recommendation = "5.000 km içinde yağ ve filtre kontrolü yaptırman önerilir.";

  const created = await prisma.analysis.create({
    data: {
      userId,
      carId,
      type: "PREDICT",
      riskPercentage,
      riskLevel,
      predictedIssues,
      recommendation
    }
  });

  res.json({
    riskPercentage,
    riskLevel,
    predictedIssues,
    recommendation,
    createdAt: created.createdAt
  });
};

export const listAnalyses = async (req: AuthedRequest, res: Response) => {
  const userId = req.user?.id || req.query.userId;
  if (!userId) return res.status(400).json({ error: "userId required" });
  const analyses = await prisma.analysis.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      type: true,
      healthScore: true,
      riskPercentage: true,
      riskLevel: true,
      createdAt: true
    }
  });
  // map type to "instant" or "predict" in response
  const mapped = analyses.map((a) => ({
    id: a.id,
    type: a.type === "INSTANT" ? "instant" : "predict",
    healthScore: a.healthScore ?? null,
    riskPercentage: a.riskPercentage ?? null,
    riskLevel: a.riskLevel,
    createdAt: a.createdAt
  }));
  res.json(mapped);
};