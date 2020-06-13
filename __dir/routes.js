"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var twilio_1 = require("twilio");
var BotController_1 = __importDefault(require("./controllers/BotController"));
var UserController_1 = __importDefault(require("./controllers/UserController"));
var routes = express_1.default.Router();
var res = twilio_1.webhook({ validate: false });
routes.post('/twilio', res, BotController_1.default.response);
routes.post('/users', UserController_1.default.create);
exports.default = routes;
