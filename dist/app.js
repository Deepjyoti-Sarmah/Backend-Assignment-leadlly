"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
exports.app = app;
const PORT = 8080;
app.get("/", (req, res) => {
    return res.status(200).json({
        msg: "health check"
    });
});
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
