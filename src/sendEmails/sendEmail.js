const nodemailer = require("nodemailer"); // Require the Nodemailer package


async function sendEmail(to, subject, html) {
    console.log(to, subject, html)

    const transporter = nodemailer.createTransport({
        host: "smtp.hostinger.com",
        port: 465,
        auth: {
            user: "no-reply@planejadordeintercambio.com.br",
            pass: "Goias123.",
        },
    });
    let info = await transporter.sendMail({
        from: "no-reply@planejadordeintercambio.com.br",
        to: to,
        subject: subject,
        text: "",
        html: html
    });
    console.log("Message sent: %s", info.messageId);
    console.log("View email: %s", nodemailer.getTestMessageUrl(info));

}

module.exports = sendEmail