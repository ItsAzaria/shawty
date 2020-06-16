export const deleteLogout = (req: any, res: any) => {
  req.logOut();
  res.redirect("/login");
};
