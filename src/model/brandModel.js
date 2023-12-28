const pool = require("../config/db");

const getBrand = async () => {
    console.log("model getBrand");
    try {
        const [result] = await pool.query(`SELECT * FROM brand`);
        return result;
    } catch (err) {
        throw err;
    }
};

module.exports = { getBrand };
