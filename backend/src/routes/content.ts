import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

// GET /api/case-studies
router.get("/case-studies", async (req, res) => {
  try {
    const caseStudies = await prisma.caseStudy.findMany({
      orderBy: { publishedAt: "desc" },
    });
    res.json({ caseStudies });
  } catch (err) {
    console.error("GET case studies error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

// GET /api/testimonials
router.get("/testimonials", async (req, res) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json({ testimonials });
  } catch (err) {
    console.error("GET testimonials error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
