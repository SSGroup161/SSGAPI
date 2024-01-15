const pool = require("../config/db");

const getBrandById = async (id) => {
    console.log("model getBrand");
    try {
        const [result] = await pool.query(
            `SELECT * FROM brand WHERE id='${id}'`
        );
        return result;
    } catch (err) {
        throw err;
    }
};

module.exports = { getBrandById };
