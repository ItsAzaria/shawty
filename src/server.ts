import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import passport from "passport";
import flash from "express-flash";
import session from "express-session";
import methodOverride from "method-override";
import requestCountry from "request-country";
import path from "path";

import ShortUrl from "./models/url";
import User from "./models/user";

import initializePassport from "./passport.config";

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
app.set('views', path.join(__dirname, '/views'))
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.get("/", checkAuthenticated, async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.render("index", { shortUrls, user: req.user });
});

app.post("/", checkAuthenticated, async (req, res) => {
  await ShortUrl.create({
    full: req.body.fullUrl
  });

  res.redirect("/");
});

app.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register");
});

app.post("/register", checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    res.redirect("/login");
  } catch {
    res.redirect("/register");
  }
});

app.get("/login", checkNotAuthenticated, async (req, res) => {
  res.render("login");
});

app.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

app.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
});

app.get("/:shortUrl", async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });

    if (!shortUrl) return res.sendStatus(404);

    shortUrl.clicks++;
    shortUrl.save();

    res.redirect(shortUrl.full);
  });

function checkAuthenticated(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
}

function checkNotAuthenticated(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }

  next();
}

app.listen(process.env.PORT || 5000);
