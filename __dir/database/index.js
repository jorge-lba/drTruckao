"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = require("dotenv");
dotenv_1.config();
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.connect(String(process.env.URL_DATABASE), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
exports.default = mongoose_1.default;
