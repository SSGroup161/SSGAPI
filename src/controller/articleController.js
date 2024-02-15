const {
    getArticle,
    getArticleById,
    postArticle,
    deleteById,
} = require("../model/articleModel");
require("dotenv").config();
const xss = require("xss");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("../config/cloudinary");

const brandController = {
    getDataById: async (req, res, next) => {
        try {
            const { id } = req.params;

            const dataArticleById = await getArticleById(id);
            console.log("dataArticleById");
            console.log(dataArticleById);
            res.status(200).json({
                status: 200,
                message: "get data articlebyid success",
                data: dataArticleById,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                status: 500,
                message: "Internal server error",
            });
        }
    },
    getData: async (req, res, next) => {
        try {
            const dataArticle = await getArticle();
            console.log("dataArticle");
            console.log(dataArticle);
            res.status(200).json({
                status: 200,
                message: "get data article success",
                data: dataArticle,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                status: 500,
                message: "Internal server error",
            });
        }
    },
    postData: async (req, res, next) => {
        try {
            const {
                id,
                title,
                creator,
                day,
                date,
                caption_img,
                description,
                place,
            } = req.body;
            const link_img = req.file;
            const uuid = uuidv4();

            console.log("post data");
            console.log(
                title,
                creator,
                day,
                date,
                link_img,
                caption_img,
                description,
                place
            );

            if (!req.isFileValid) {
                return res
                    .status(404)
                    .json({ message: req.isFileValidMessage });
            }

            if (
                !title ||
                !creator ||
                !day ||
                !date ||
                !link_img ||
                !caption_img ||
                !description ||
                !place
            ) {
                return res.status(400).json({
                    status: 400,
                    message: "input required",
                });
            }

            const resultt = await cloudinary.uploader.upload(link_img.path, {
                use_filename: true,
                folder: "SSG/Article",
            });

            console.log("data");
            const data = {
                id: uuid,
                title: xss(title),
                creator: xss(creator),
                day: xss(day),
                date: xss(date),
                link_img: resultt.secure_url,
                caption_img: xss(caption_img),
                description: xss(description),
                place: xss(place),
                public_id: resultt.public_id,
            };

            console.log(data);
            const result = await postArticle(data);
            console.log(result);

            res.status(200).json({
                status: 200,
                message: "Message has been sent!",
                data,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                status: 500,
                message: "Internal server error",
            });
        }
    },
    deleteDataById: async (req, res, next) => {
        try {
            const { id } = req.params;

            if (
                !id ||
                !id.match(
                    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
                )
            ) {
                return res
                    .status(400)
                    .json({ status: 400, message: "Invalid ID format" });
            }

            const dataArticle = await getArticleById(id);
            if (!dataArticle) {
                return res
                    .status(404)
                    .json({ status: 404, message: "Article not found" });
            }

            await cloudinary.uploader.destroy(dataArticle.public_id);

            const result = await deleteById(id);
            if (!result || result.affectedRows === 0 || result.rowCount === 0) {
                // Sesuaikan dengan DBMS yang digunakan
                return res
                    .status(404)
                    .json({ status: 404, message: "Failed to delete article" });
            }

            res.status(200).json({
                status: 200,
                message: "Article deleted successfully",
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 500, message: err.message });
        }
    },
};

module.exports = brandController;
