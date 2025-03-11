const nodemailer = require("nodemailer");
const { EMAIL, PASSWORD } = require('../env.js');

const automateMail = (req, res) => {
    const { userEmail, subject, body } = req.body; 

    let config = {
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    };

    let transporter = nodemailer.createTransport(config);

    let message = {
        from: EMAIL,
        to: userEmail,
        subject: subject, 
        html: body 
    };

    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg: "Email sent Successfully"
        });
    }).catch(error => {
        return res.status(500).json({ error });
    });
};

module.exports = automateMail;