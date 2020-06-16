import ShortUrl from "../models/url";

export const getShortLink = async (req: any, res: any) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });

    if (!shortUrl) return res.sendStatus(404);

    shortUrl.clicks++;
    shortUrl.save();

    res.redirect(shortUrl.full);
};
