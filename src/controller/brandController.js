const { getBrand } = require("../model/brandModel");
require("dotenv").config();

const brandController = {
    getDataById: async (req, res, next) => {
        try {
            const { id } = req.params;

            const dataBrand = await getBrand(id);
            console.log("dataBrand");
            console.log(dataBrand);
            res.status(200).json({
                status: 200,
                message: "get data users success",
                data: dataBrand,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                status: 500,
                message: "Internal server error",
            });
        }
    },
};

module.exports = brandController;
