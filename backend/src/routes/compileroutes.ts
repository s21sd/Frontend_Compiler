import express from "express";
import { loadCode, saveCode } from "../contoller/compileController";
export const compileroutes = express.Router();

compileroutes.post("/save", saveCode)
compileroutes.post("/load", loadCode)
