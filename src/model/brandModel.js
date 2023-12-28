const pool = require("../config/db");

const getBrand = async (id) => {
    console.log("model getBrand");
    try {
        const [result] = await pool.query(
            `SELECT * FROM brand WHERE id='0071599e-e419-4577-a466-b7e7c777c4a5'`
        );
        return result;
    } catch (err) {
        throw err;
    }
};

module.exports = { getBrand };
