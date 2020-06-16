import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import User from "./models/user";
import passport from "passport";
import flash from "express-flash";
import session from "express-session";
import methodOverride from "method-override";
import requestCountry from "request-country";
import path from "path";
import initializePassport from "./passport.config";

import { getIndex, postIndex } from "./controllers/index";
import { getRegister, postRegister } from "./controllers/register";
import { getLogin, postLogin } from "./controllers/login";
import { deleteLogout } from "./controllers/logout";
import { getShortLink } from "./controllers/short.link";
import { isNotAuthed } from "./middleware/isNotAuthed";
import { isAuthed } from "./middleware/isAuthed"
import { signupsEnabled } from "./middleware/signupsEnabled";

dotenv.config();

initializePassport(
  passport,
  async (email: any) => {
    return await User.findOne({ email });
  },
  async (id: any) => {
    return await User.findOne({ id });
  }
);

const app = express();

mongoose.connect("mongodb://localhost/shawty", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

/*

  ROUTES

*/

app.get("/", isAuthed, getIndex);
app.post("/", isAuthed, postIndex);

app.get("/register", [isNotAuthed, signupsEnabled], getRegister);
app.post("/register", [isNotAuthed, signupsEnabled], postRegister);

app.get("/login", isNotAuthed, getLogin);
app.post("/login", isNotAuthed, postLogin);

app.delete('/logout', deleteLogout);

app.get("/:shortUrl", getShortLink);



app.listen(process.env.PORT || 5000);
