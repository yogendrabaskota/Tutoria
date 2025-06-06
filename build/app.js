"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./database/database");
const app = (0, express_1.default)();
const PORT = 3000;
app.get("/", (req, res) => {
    res.send("This is backend");
});
(0, database_1.connectDatabase)();
app.listen(PORT, () => {
    console.log("Server has started at port ", PORT);
});
