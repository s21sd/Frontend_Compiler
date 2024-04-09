"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileroutes = void 0;
const express_1 = __importDefault(require("express"));
const compileController_1 = require("../contoller/compileController");
const verifyTokenAnonynomous_1 = require("../middlewares/verifyTokenAnonynomous");
const checkAuthMiddleware_1 = require("../middlewares/checkAuthMiddleware");
exports.compileroutes = express_1.default.Router();
exports.compileroutes.post("/save", verifyTokenAnonynomous_1.verifyTokenAnonymous, compileController_1.saveCode);
exports.compileroutes.post("/load", verifyTokenAnonynomous_1.verifyTokenAnonymous, compileController_1.loadCode);
exports.compileroutes.delete('/delete/:id', checkAuthMiddleware_1.verifyToken, compileController_1.deleteCode);
exports.compileroutes.put('/edit/:id', checkAuthMiddleware_1.verifyToken, compileController_1.editCode);
exports.compileroutes.get("/get-all-codes", compileController_1.getAllCodes);
