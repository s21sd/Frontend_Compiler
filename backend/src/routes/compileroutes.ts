import express from "express";
import { saveCode } from "../contoller/compileController";

export const compileroutes = express.Router();

compileroutes.post("/save", saveCode)