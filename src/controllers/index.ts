import ShortUrl from "../models/url";

export async function getIndex(req: any, res: any) {
  const shortUrls = await ShortUrl.find();

  res.render("index", { shortUrls, user: req.user });
}

export async function postIndex(req: any, res: any) {
  await ShortUrl.create({
    full: req.body.fullUrl,
  });

  res.redirect("/");
}
