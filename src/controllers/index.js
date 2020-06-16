const ShortUrl = require("./models/url");

exports.getIndex = async (req, res) => {
    const shortUrls = await ShortUrl.find();
    
    res.render("index", { shortUrls, user: req.user });
};
  
exports.postIndex = async (req, res) => {
    await ShortUrl.create({
      full: req.body.fullUrl,
    });
  
    res.redirect("/");
};