"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config({ path: './.env' });
const app_1 = require("./app");
const db_1 = __importDefault(require("./db"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.default)();
        app_1.app.on("error", (error) => {
            console.log("Error: ", error);
            throw error;
        });
        app_1.app.listen(process.env.PORT, () => {
            console.log(`Server is listening at PORT: ${process.env.PORT}`);
        });
    }
    catch (error) {
        console.log("MongoDB connection failed ERROR: ", error);
        throw error;
    }
}))();
