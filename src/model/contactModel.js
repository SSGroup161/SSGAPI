const pool = require("../config/db");

const postContact = async (data) => {
    const { id, name, email, message } = data;
    console.log("model postUsers");
    try {
        const queryString =
            "INSERT INTO contact (id, name, email, message) VALUES (?, ?, ?, ?)";
        const values = [id, name, email, message];

        const [rows] = await pool.execute(queryString, values);
        return rows;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports = { postContact };
