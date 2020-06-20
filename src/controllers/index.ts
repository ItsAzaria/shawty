import ShortUrl from "../models/url";

export const getIndex = async (req: any, res: any) => {
  const shortUrls = await ShortUrl.find()
    .where("user")
    .equals(req.session.passport.user);

  res.render("index", { shortUrls, user: req.user });
};
