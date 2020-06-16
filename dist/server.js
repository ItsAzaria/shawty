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
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_1 = __importDefault(require("passport"));
const express_flash_1 = __importDefault(require("express-flash"));
const express_session_1 = __importDefault(require("express-session"));
const method_override_1 = __importDefault(require("method-override"));
const path_1 = __importDefault(require("path"));
const url_1 = __importDefault(require("./models/url"));
const user_1 = __importDefault(require("./models/user"));
const passport_config_1 = __importDefault(require("./passport.config"));
dotenv_1.default.config();
passport_config_1.default(passport_1.default, (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_1.default.findOne({ email });
}), (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_1.default.findOne({ id });
}));
const app = express_1.default();
mongoose_1.default.connect("mongodb://localhost/shawty", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
app.set("view engine", "ejs");
app.set('views', path_1.default.join(__dirname, '/views'));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(__dirname + '/public'));
app.use(express_flash_1.default());
app.use(express_session_1.default({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(method_override_1.default('_method'));
app.get("/", checkAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shortUrls = yield url_1.default.find();
    res.render("index", { shortUrls, user: req.user });
}));
app.post("/", checkAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield url_1.default.create({
        full: req.body.fullUrl
    });
    res.redirect("/");
}));
app.get("/register", checkNotAuthenticated, (req, res) => {
    res.render("register");
});
app.post("/register", checkNotAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield bcrypt_1.default.hash(req.body.password, 10);
        yield user_1.default.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        res.redirect("/login");
    }
    catch (_a) {
        res.redirect("/register");
    }
}));
app.get("/login", checkNotAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("login");
}));
app.post("/login", checkNotAuthenticated, passport_1.default.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
}));
app.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
});
app.get("/:shortUrl", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shortUrl = yield url_1.default.findOne({ short: req.params.shortUrl });
    if (!shortUrl)
        return res.sendStatus(404);
    shortUrl.clicks++;
    shortUrl.save();
    res.redirect(shortUrl.full);
}));
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    next();
}
app.listen(process.env.PORT || 5000);
//# sourceMappingURL=server.js.map