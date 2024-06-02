import { Router } from "express";
import suscriptionRouter from "./suscription.routes";
const router = Router();
router.use("/suscription", suscriptionRouter);
export default router;
