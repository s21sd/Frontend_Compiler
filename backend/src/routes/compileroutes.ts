import express from "express";
import { deleteCode, editCode, loadCode, saveCode } from "../contoller/compileController";
import { verifyTokenAnonymous } from "../middlewares/verifyTokenAnonynomous";
import { verifyToken } from "../middlewares/checkAuthMiddleware";
export const compileroutes = express.Router();

compileroutes.post("/save", verifyTokenAnonymous, saveCode)
compileroutes.post("/load", loadCode)
compileroutes.delete('/delete/:id', verifyToken, deleteCode)
compileroutes.put('/edit', verifyToken, editCode);
