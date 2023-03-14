import express, { json, Request, Response, NextFunction } from "express";
import cors from "cors";
import { routes } from "@shared/http/routes";
import AppError from "@shared/errors/AppError";
import "@shared/typeorm";

const app = express();

app.use(json());
app.use(cors());
app.use(routes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.status_code).json({
      status: "error",
      message: error.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.listen(3333, () => console.log("Server Running! "));
