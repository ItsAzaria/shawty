"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthed = void 0;
exports.isAuthed = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};
//# sourceMappingURL=isAuthed.js.map