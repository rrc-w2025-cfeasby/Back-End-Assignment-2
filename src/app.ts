import express, { Express } from "express";
import morgan from "morgan";

// Initialize Express application
const app: Express = express();

app.use(morgan("combined"));

app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

// Define a route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

export default app;
