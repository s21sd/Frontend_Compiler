import express from "express";
import { deleteCode, editCode, getAllCodes, loadCode, saveCode } from "../contoller/compileController";
import { verifyTokenAnonymous } from "../middlewares/verifyTokenAnonynomous";
import { verifyToken } from "../middlewares/checkAuthMiddleware";
export const compileroutes = express.Router();

compileroutes.post("/save", verifyTokenAnonymous, saveCode)
compileroutes.post("/load", verifyTokenAnonymous, loadCode)
compileroutes.delete('/delete/:id', verifyToken, deleteCode)
compileroutes.put('/edit/:id', verifyToken, editCode);
compileroutes.get("/get-all-codes", getAllCodes);
