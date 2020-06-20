export const signupsEnabled = (req: any, res: any, next: any) => {
  if (process.env.SIGNUPS === '1') {
    return next();
  }
  req.flash('error', 'Signups are not currently enabled');

  res.redirect("/login");
};
