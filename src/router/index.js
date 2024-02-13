const express = require("express");
const router = express.Router();
const Brand = require("./brand");
const Contact = require("./contact");
const Article = require("./article");
const Auth = require("./auth");

router.use("/brand", Brand);
router.use("/contact", Contact);
router.use("/article", Article);
router.use("/auth", Auth);

module.exports = router;
