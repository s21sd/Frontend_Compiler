import express from "express";
import { loadCode, saveCode } from "../contoller/compileController";
import { verifyTokenAnonymous } from "../middlewares/verifyTokenAnonynomous";
export const compileroutes = express.Router();

compileroutes.post("/save", verifyTokenAnonymous, saveCode)
compileroutes.post("/load", loadCode)
