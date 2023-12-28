const express = require("express");
const router = express.Router();
const Brand = require("./brand");

router.use("/brand", Brand);

module.exports = router;
