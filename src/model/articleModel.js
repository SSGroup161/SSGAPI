const pool = require("../config/db");

const getArticleById = async (id) => {
    console.log("model getArticleById");
    try {
        const [result] = await pool.query(
            `SELECT * FROM article WHERE id='${id}'`
        );
        return result;
    } catch (err) {
        throw err;
    }
};

const getArticle = async () => {
    console.log("model getArticle");
    try {
        const [result] = await pool.query(`SELECT * FROM article`);
        return result;
    } catch (err) {
        throw err;
    }
};

const postArticle = async (data) => {
    const {
        id,
        title,
        creator,
        day,
        date,
        link_img,
        caption_img,
        description,
        place,
        public_id,
    } = data;
    console.log("model postArticle");
    try {
        const queryString =
            "INSERT INTO article (id, title, creator, day, date, link_img, caption_img, description, place, public_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const values = [
            id,
            title,
            creator,
            day,
            date,
            link_img,
            caption_img,
            description,
            place,
            public_id,
        ];

        const [rows] = await pool.execute(queryString, values);
        return rows;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports = { getArticleById, getArticle, postArticle };
