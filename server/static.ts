import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.join(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // Explicit favicon route so /favicon.ico is always served in production
  const faviconPath = path.join(distPath, "favicon.ico");
  if (fs.existsSync(faviconPath)) {
    app.get("/favicon.ico", (_req, res) => {
      res.sendFile(faviconPath);
    });
  }

  // fall through to index.html if the file doesn't exist (SPA)
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}
