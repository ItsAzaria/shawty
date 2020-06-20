"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const shortid_1 = __importDefault(require("shortid"));
const urlSchema = new mongoose_1.default.Schema({
    full: {
        type: String,
        required: true,
    },
    short: {
        type: String,
        required: true,
        default: shortid_1.default.generate,
    },
    clicks: {
        type: Number,
        required: true,
        default: 0,
    },
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
    },
});
exports.default = mongoose_1.default.model("ShortUrl", urlSchema);
//# sourceMappingURL=url.js.map