const express = require("express");
const router = express.Router();
const {
    getData,
    getDataById,
    postData,
    deleteDataById,
} = require("../controller/articleController");
const upload = require("../helper/uploadCloudinary");
const { Protect } = require("../middleware/Protect");

router.get("/:id", getDataById);
router.get("/", getData);
router.post("/", Protect, upload.single("link_img"), postData);
router.delete("/:id", Protect, deleteDataById);

module.exports = router;
