import passport from "passport";

export const getLogin = (req: any, res: any) => {
    res.render("login");
}

export const postLogin = (req: any, res: any, next: any) => {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true,
    })(req, res, next);
}