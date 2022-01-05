const express = require("express");
const mongoose = require("mongoose");
const Site = require("./models/site");
const siteRouter = require("./routes/sites");
const methodOverride = require("method-override");
const app = express();

mongoose.connect("mongodb://localhost/MyVisitedSites", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const sites = await Site.find().sort({ createdAt: "desc" });
  res.render("sites/index", { sites: sites });
});

app.use("/sites", siteRouter);

app.listen(5000);
