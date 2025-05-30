import { registerRoutes } from "./routes";
import { db } from "./storage";
import express from "express";
import { type Request, Response } from "express";

export default async function handler(req: Request, res: Response) {
  try {
    // Express 앱 생성
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // 라우트 등록
    await registerRoutes(app);

    // 요청 처리
    app(req, res, () => {});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
