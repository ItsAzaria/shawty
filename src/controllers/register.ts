import bcrypt from "bcrypt";
import User from "../models/user";

export async function getRegister(req: any, res: any) {
    res.render("register");
};
  
export async function postRegister(req: any, res: any) {
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
};
