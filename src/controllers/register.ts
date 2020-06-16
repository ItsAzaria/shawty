import bcrypt from "bcrypt";
import User from "../models/user";

export const getRegister = (req: any, res: any) => {
    res.render("register");
};
  
export const postRegister = async(req: any, res: any) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await User.create({
          email: req.body.email,
          password: hashedPassword,
        });
    
        res.redirect("/login");
      } catch {
        res.redirect("/register");
      }
};
