import passport from "passport";

export async function getLogin(req: any, res: any) {
  res.render("login");
}

export async function postLogin(req: any, res: any) {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  });
}
