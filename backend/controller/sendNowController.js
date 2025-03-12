const nodemailer = require("nodemailer");
const ScheduledEmail = require('../model/scheduledEmail.js');
const User = require('../model/user');

const automateMail = async (req, res) => {
    const { senderEmail, userEmail, subject, body } = req.body;

    try {
        if (!userEmail || !subject || !body) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const senderUser = await User.findOne({ email: senderEmail });

        if (!senderUser) {
            return res.status(404).json({ error: 'Sender user not found' });
        }

        let config = {
            service: "gmail",
            auth: {
                user: senderUser.email,
                pass: senderUser.passkey
            }
        };

        let transporter = nodemailer.createTransport(config);
        let message = {
            from: senderUser.email,
            to: userEmail,
            subject: subject,
            html: body
        };

        await transporter.sendMail(message);

        const scheduledEmail = new ScheduledEmail({
            from: senderEmail, 
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