const express = require("express");
const router = express.Router();
const {
    getData,
    getDataById,
    postData,
    deleteDataById,
    putData,
} = require("../controller/articleController");
const upload = require("../helper/uploadCloudinary");
const { Protect } = require("../middleware/Protect");

router.get("/:id", getDataById);
router.get("/", getData);
router.post("/", Protect, upload.single("link_img"), postData);
router.delete("/:id", Protect, deleteDataById);
router.put("/:id", Protect, upload.single("link_img"), putData);

module.exports = router;
