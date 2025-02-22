const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
    }
});

const sendMail = async (req, res) => {

    const { to, subject, body } = req.body;

    const mailOptions = {
        from: process.env.NODEMAILER_USER,
        to: to,
        subject: subject,
        text: body
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        res.send({ success: true })
    } catch (error) {
        console.error('Error sending email:', error);
        res.send({ success: false })
    }

}

module.exports = sendMail
