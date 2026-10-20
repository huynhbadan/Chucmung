// server.ts
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express();
var port = process.env.PORT || 3e3;
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));
app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
app.listen(Number(port), "0.0.0.0", () => {
  console.log(`Server listening on port ${port}`);
});
