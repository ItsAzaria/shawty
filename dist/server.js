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
const user_1 = __importDefault(require("./models/user"));
const passport_1 = __importDefault(require("passport"));
const express_flash_1 = __importDefault(require("express-flash"));
const express_session_1 = __importDefault(require("express-session"));
const method_override_1 = __importDefault(require("method-override"));
const path_1 = __importDefault(require("path"));
const passport_config_1 = __importDefault(require("./passport.config"));
const index_1 = require("./controllers/index");
const register_1 = require("./controllers/register");
const login_1 = require("./controllers/login");
const logout_1 = require("./controllers/logout");
const short_link_1 = require("./controllers/short.link");
const isNotAuthed_1 = require("./middleware/isNotAuthed");
const isAuthed_1 = require("./middleware/isAuthed");
const signupsEnabled_1 = require("./middleware/signupsEnabled");
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
app.set("views", path_1.default.join(__dirname, "/views"));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(__dirname + "/public"));
app.use(express_flash_1.default());
app.use(express_session_1.default({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(method_override_1.default("_method"));
mongoose_1.default.set("useCreateIndex", true);
/*

  ROUTES

*/
app.get("/", isAuthed_1.isAuthed, index_1.getIndex);
app.post("/", isAuthed_1.isAuthed, index_1.postIndex);
app.get("/register", [isNotAuthed_1.isNotAuthed, signupsEnabled_1.signupsEnabled], register_1.getRegister);
app.post("/register", [isNotAuthed_1.isNotAuthed, signupsEnabled_1.signupsEnabled], register_1.postRegister);
app.get("/login", isNotAuthed_1.isNotAuthed, login_1.getLogin);
app.post("/login", isNotAuthed_1.isNotAuthed, login_1.postLogin);
app.delete("/logout", logout_1.deleteLogout);
app.get("/:shortUrl", short_link_1.getShortLink);
app.listen(process.env.PORT || 5000);
//# sourceMappingURL=server.js.map