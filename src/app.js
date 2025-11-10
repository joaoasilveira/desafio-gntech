import express from "express";
import weatherRoutes from './routes/weatherRoutes.js';

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server running properly" });
});

app.use("/weather", weatherRoutes);

export default app;