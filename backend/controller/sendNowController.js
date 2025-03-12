const nodemailer = require("nodemailer");
const ScheduledEmail = require('../model/scheduledEmail.js');
const { EMAIL, PASSWORD } = require("../env.js");

const automateMail = async (req, res) => {
    const { userEmail, subject, body } = req.body;

    try {
        if (!userEmail || !subject || !body) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        let config = {
            service: "gmail",
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

        await transporter.sendMail(message);

        const scheduledEmail = new ScheduledEmail({
            to: userEmail,
            subject: subject,
            body: body,
            scheduledTime: new Date(), 
            status: 'sent'
        });

        await scheduledEmail.save();

        return res.status(201).json({ msg: "Email sent and saved successfully" });

    } catch (error) {
        console.error('Error sending email or saving to database:', error);
        return res.status(500).json({ error: 'Error sending email or saving to database' });
    }
};

module.exports = automateMail;