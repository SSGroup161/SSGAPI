const pool = require("../config/db");

const getArticleById = async (id) => {
    console.log("model getArticleById");
    try {
        const query = "SELECT * FROM article WHERE id = ?";
        const [rows] = await pool.execute(query, [id]);

        if (rows.length === 0) {
            return null;
        }

        return rows[0];
    } catch (err) {
        console.error("Error in getArticleById:", err);
        throw err;
    }
};

const getArticle = async () => {
    console.log("model getArticle");
    try {
        const [result] = await pool.execute(
            `SELECT * FROM article ORDER BY created_at DESC`
        );
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

const deleteById = async (id) => {
    console.log("delete article by id ->", id);
    return new Promise((resolve, reject) => {
        pool.query(`DELETE FROM article WHERE id = ?`, [id], (err, result) => {
            if (!err) {
                resolve(result);
            } else {
                reject(err);
            }
        });
    });
};

module.exports = { getArticleById, getArticle, postArticle, deleteById };
