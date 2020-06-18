"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLogout = void 0;
exports.deleteLogout = (req, res) => {
    req.logOut();
    res.redirect("/login");
};
//# sourceMappingURL=logout.js.map