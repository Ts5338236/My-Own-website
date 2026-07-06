import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

import authRouter from "./routes/auth";
import leadsRouter from "./routes/leads";
import contentRouter from "./routes/content";

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup allowing credentials (for cookies passing between ports)
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date() });
});

// Register routers
app.use("/api/auth", authRouter);
app.use("/api/leads", leadsRouter);
app.use("/api", contentRouter); // provides /api/case-studies and /api/testimonials

app.listen(PORT, () => {
  console.log(`[Server]: Aetheric API server running on http://localhost:${PORT}`);
});
