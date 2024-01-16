const { postContact } = require("../model/contactModel");
require("dotenv").config();
const nodemailer = require("nodemailer");
const xss = require("xss");
const { v4: uuidv4 } = require("uuid");

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: true,
    port: 465,
    auth: {
        user: process.env.EMAILGMAIL,
        pass: process.env.PASSGMAIL,
    },
    connectionTimeout: 10000,
});

const ssglogo =
    "https://res.cloudinary.com/dixxtnquz/image/upload/v1700907458/SSG/._The_Place_of_the_bu_hi0b5s.png";

const htmlMessage = (name, logo) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
            rel="stylesheet"
        />
        <title>SS Group</title>
    </head>

    <body
        style="
            margin: auto;
            font-family: 'Roboto', sans-serif;
            text-align: center;
            color: #444341;
            margin: 4rem 0rem;
            padding: 0rem 2rem;
        "
    >
        <div>
            <br />
            <p style="font-size: 16px; font-weight: 500; margin: 0">
                Halo ${name}
            <p style="font-size: 16px; font-weight: 500; margin: 0">
                Terima kasih telah menghubungi kami!
            </p>
            <p style="font-size: 14px; font-weight: 400; margin: 8px 0">
                Pesan ini dikirim otomatis sebagai konfirmasi penerimaan pesan
                Anda. Mohon jangan dibalas.
            </p>
            <p style="font-size: 14px; font-weight: 400; margin: 8px 0">
                Kami akan segera menghubungi Anda secepatnya!
            </p>
            <p style="font-size: 14px; font-weight: 400; margin: 16px 0">
                Kunjungi website kami untuk info promo dan produk baru!
            </p>
            <p style="font-size: 14px; font-weight: 400; margin: 16px 0">
                Salam hangat dari kami,<br />
                Shella Saukia Group (SS Group)
            </p>
            <a
                href="https://www.ssgroup.id"
                style="
                    text-decoration: none;
                    color: #d2ac47;
                    font-size: 14px;
                    margin-top: 10px;
                    display: inline-block;
                "
                >ssgroup.id</a
            >
            <p style="font-size: 12px; margin-top: 10px">
                © 2023 SS Group. All rights reserved.
            </p>
            <img src=${logo} alt="ssg" width="300px">
        </div>
    </body>
</html>
`;

const contactController = {
    postDataContact: async (req, res, next) => {
        try {
            const { name, email, message } = req.body;
            const uuid = uuidv4();

            console.log("post data");
            console.log(name, email, message);

            if (!name || !email || !message) {
                return res.status(400).json({
                    status: 400,
                    message: "input name, email, message required",
                });
            }

            const mailOptions = {
                from: {
                    name: "no-reply",
                    address: process.env.EMAILCOMPANY,
                },
                to: xss(email),
                subject: "Pesan otomatis, jangan dibalas.",
                text: `Halo ${name}, have a nice day!`,
                html: htmlMessage(name, ssglogo),
            };

            console.log("emailcompany", process.env.EMAILCOMPANY);

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("Gagal mengirim email: ", error);
                    return res.status(500).json({
                        status: 500,
                        message: "Failed to send email",
                    });
                } else {
                    console.log("Email terkirim: ", info.response);
                }
            });

            console.log("data");
            const data = {
                id: uuid,
                name: xss(name),
                email: xss(email),
                message: xss(message),
            };

            console.log(data);
            const result = await postContact(data);
            console.log(result);

            res.status(200).json({
                status: 200,
                say: `Hello ${name}!`,
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
};

module.exports = contactController;
