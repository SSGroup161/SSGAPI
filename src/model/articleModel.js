const pool = require("../config/db");

const getArticleById = async (id) => {
    console.log("model getArticleById");
    try {
        const query = "SELECT * FROM article WHERE id_title = ?";
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
        id_title,
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
            "INSERT INTO article (id, id_title, title, creator, day, date, link_img, caption_img, description, place, public_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const values = [
            id,
            id_title,
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
    try {
        const [result] = await pool.execute(
            `DELETE FROM article WHERE id = ?`,
            [id]
        );
        return result;
    } catch (err) {
        console.error("Error in deleteById:", err);
        throw err;
    }
};

const putArticle = async (data, id) => {
    const {
        id_title,
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
    console.log("model putArticle");
    console.log(data);
    try {
        const queryString = `
            UPDATE article
            SET id_title= ?, title = ?, creator = ?, day = ?, date = ?, link_img = ?, caption_img = ?, description = ?, place = ?, public_id = ?
            WHERE id = ?`;
        const values = [
            id_title || null,
            title || null,
            creator || null,
            day || null,
            date || null,
            link_img || null,
            caption_img || null,
            description || null,
            place || null,
            public_id || null,
            id,
        ];

        const [result] = await pool.execute(queryString, values);

        if (result.affectedRows === 0) {
            throw new Error(`Artikel dengan ID ${id} tidak ditemukan.`);
        }
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports = {
    getArticleById,
    getArticle,
    postArticle,
    deleteById,
    putArticle,
};
