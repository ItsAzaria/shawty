import bcrypt from "bcrypt";
import User from "../models/user";

export const getRegister = (req: any, res: any) => {
  res.render("register");
};

export const postRegister = async (req: any, res: any) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  await User.create({
    email: req.body.email,
    password: hashedPassword,
  })
    .then(() => {
      req.flash("success", "Registered account, you may now log in.");
      res.redirect("/login");
    })
    .catch((err) => {
      req.flash("error", err.message);
      res.redirect("/register");
    });
};
