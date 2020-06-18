"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupsEnabled = void 0;
exports.signupsEnabled = (req, res, next) => {
    if (process.env.SIGNUPS === '1') {
        return next();
    }
    res.redirect("/login");
};
//# sourceMappingURL=signupsEnabled.js.map