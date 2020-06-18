"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNotAuthed = void 0;
exports.isNotAuthed = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    next();
};
//# sourceMappingURL=isNotAuthed.js.map