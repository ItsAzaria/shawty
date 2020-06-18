"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLogin = exports.getLogin = void 0;
const passport_1 = __importDefault(require("passport"));
exports.getLogin = (req, res) => {
    res.render("login");
};
exports.postLogin = (req, res, next) => {
    passport_1.default.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true,
    })(req, res, next);
};
//# sourceMappingURL=login.js.map