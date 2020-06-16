import ShortUrl from "../models/url";

export const getIndex = async (req: any, res: any) => {
  const shortUrls = await ShortUrl.find();

  res.render("index", { shortUrls, user: req.user });
};

export const postIndex = async (req: any, res: any) => {
  await ShortUrl.create({
    full: req.body.fullUrl,
  });

  res.redirect("/");
};
