// /api/auth
import { Router } from "express";
import { login } from "../controllers/auth.ts";
import catchErrors from "../middlewares/catchErrors.ts";

const router = Router();

router.post("/", catchErrors(login));

export { router as authRouter };
