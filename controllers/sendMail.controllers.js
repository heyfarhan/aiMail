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
    try {

        if (!to.length || !subject.length || !body.length) {
            throw new Error('Provide all the Details..')
        }

        const mailOptions = {
            from: process.env.NODEMAILER_USER,
            to: to,
            subject: subject,
            text: body
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        res.send({ success: true })
    } catch (err) {
        res.send({ success: false, message: err.message })
    }

}

module.exports = sendMail
