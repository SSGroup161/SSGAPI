const express = require("express");
const router = express.Router();
const {
    getData,
    getDataById,
    postData,
} = require("../controller/articleController");
const upload = require("../helper/uploadCloudinary");

router.get("/:id", getDataById);
router.get("/", getData);
router.post("/", upload.single("link_img"), postData);

module.exports = router;
