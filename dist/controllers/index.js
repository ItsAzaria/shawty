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
exports.postIndex = exports.getIndex = void 0;
const url_1 = __importDefault(require("../models/url"));
exports.getIndex = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shortUrls = yield url_1.default.find();
    res.render("index", { shortUrls, user: req.user });
});
exports.postIndex = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield url_1.default.create({
        full: req.body.fullUrl,
    });
    res.redirect("/");
});
//# sourceMappingURL=index.js.map