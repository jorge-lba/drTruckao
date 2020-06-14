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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../twilio/index");
var index_2 = __importDefault(require("../watson/index"));
var User_1 = __importDefault(require("../models/User"));
exports.default = {
    response: function (request, response) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var twiml, numberUser, messageUser, user, twilioMessages, watsonReponse_1, watsonReponse_2, watsonReponse, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        twiml = new index_1.TwilioMessagingResponse();
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 12, , 13]);
                        numberUser = request.body.From.replace('whatsapp:', '');
                        messageUser = request.body.Body;
                        return [4 /*yield*/, User_1.default.findOne({ registrationData: { cellPhone: numberUser } })];
                    case 2:
                        user = _d.sent();
                        console.log(numberUser, messageUser);
                        if (!user) return [3 /*break*/, 6];
                        return [4 /*yield*/, index_1.twilioClient.messages.list({ from: 'whatsapp:' + numberUser, limit: 3 })];
                    case 3:
                        twilioMessages = _d.sent();
                        return [4 /*yield*/, index_2.default(messageUser)];
                    case 4:
                        watsonReponse_1 = (_a = (_d.sent())) === null || _a === void 0 ? void 0 : _a.reduce(function (previous, current) {
                            return String(previous + "\n" + current.text);
                        }, '');
                        console.log(watsonReponse_1);
                        return [4 /*yield*/, twiml.message(watsonReponse_1)];
                    case 5:
                        _d.sent();
                        console.log(twilioMessages);
                        return [3 /*break*/, 9];
                    case 6: return [4 /*yield*/, index_2.default('#bom_dia_novato')];
                    case 7:
                        watsonReponse_2 = (_b = (_d.sent())) === null || _b === void 0 ? void 0 : _b.reduce(function (previous, current) {
                            return String(previous + "\n" + current.text);
                        }, '');
                        console.log(watsonReponse_2);
                        return [4 /*yield*/, twiml.message(watsonReponse_2)];
                    case 8:
                        _d.sent();
                        console.log('Não cadastrado');
                        _d.label = 9;
                    case 9: return [4 /*yield*/, index_2.default(messageUser)];
                    case 10:
                        watsonReponse = (_c = (_d.sent())) === null || _c === void 0 ? void 0 : _c.reduce(function (previous, current) {
                            return String(previous + "\n" + current.text);
                        }, '');
                        console.log(watsonReponse);
                        return [4 /*yield*/, twiml.message(watsonReponse)
                            // response.writeHead();
                        ];
                    case 11:
                        _d.sent();
                        // response.writeHead();
                        return [2 /*return*/, response.status(200).writeHead(200, { 'Content-Type': 'text/xml' }).end(twiml.toString())];
                    case 12:
                        error_1 = _d.sent();
                        return [2 /*return*/, response.status(400).writeHead(400, { 'Content-Type': 'text/xml' }).end(twiml.toString())];
                    case 13: return [2 /*return*/];
                }
            });
        });
    }
};
