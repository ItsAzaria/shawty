export async function isNotAuthed(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }

  next();
}
