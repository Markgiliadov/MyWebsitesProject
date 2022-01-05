const express = require("express");
const Site = require("../models/site");
const router = express.Router();

router.get("/new", (req, res) => {
  res.render("sites/new", { site: new Site() });
});

router.get("/:slug", async (req, res) => {
  const site = await Site.findOne({ slug: req.params.slug });
  if (site == null) res.redirect("/");
  res.render("sites/show", { site: site });
});

router.post(
  "/",
  async (req, res, next) => {
    req.site = new Site();
    next();
  },
  saveSiteAndRedirect("new")
);

router.delete("/:id", async (req, res) => {
  await Site.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

function saveSiteAndRedirect(path) {
  return async (req, res) => {
    let site = req.site;
    site.title = req.body.title;
    site.description = req.body.description;
    site.markdown = req.body.markdown;
    site.imgUrl = req.body.imgUrl;
    try {
      site = await site.save();
      res.redirect(`/sites/${site.slug}`);
    } catch (e) {
      res.render(`sites/${path}`, { site: site });
    }
  };
}

module.exports = router;
