import ShortUrl from "../models/url";

export const createLink = async (req: any, res: any) => {
    const doc = { full: req.body.fullUrl, user: req.session.passport.user };
    await ShortUrl.create(doc);
  
    res.redirect("/");
  };

export const deleteLink = async (req: any, res: any) => {
    const shortUrl = await ShortUrl.findOne({ _id: req.query.id });
    if (!shortUrl) return res.sendStatus(404);

    shortUrl.remove();
    res.redirect("/");
}

