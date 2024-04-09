"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const dbConnect_1 = require("./lib/dbConnect");
const compileroutes_1 = require("./routes/compileroutes");
const userroutes_1 = require("./routes/userroutes");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    credentials: true,
    origin: 'http://localhost:5173'
}));
(0, dotenv_1.config)();
(0, dbConnect_1.connectToDB)();
app.use('/compile', compileroutes_1.compileroutes);
app.use('/auth', userroutes_1.userRoutes);
app.get('/', (req, res) => {
    return res.status(200).send("Api is working fine");
});
app.listen(4000, () => {
    console.log("Server is running on the port 4000");
});
