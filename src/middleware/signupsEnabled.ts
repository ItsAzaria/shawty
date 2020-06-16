export async function signupsEnabled(req: any, res: any, next: any) {
  if (process.env.SIGNUPS) {
    return next();
  }

  res.redirect("/login");
}
