const ScheduledEmail = require('../model/scheduledEmail');
const nodemailer = require('nodemailer');
const { EMAIL, PASSWORD } = require('../env.js');

const scheduleEmail = async (req, res) => {
  try {
    const { userEmail, subject, body, scheduledTime } = req.body;

    if (!userEmail || !subject || !body || !scheduledTime) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const scheduledEmail = new ScheduledEmail({
      to: userEmail,
      subject: subject,
      body: body,
      scheduledTime: new Date(scheduledTime), 
    });

    await scheduledEmail.save();
    res.status(201).json({ message: 'Email scheduled successfully' });
  } catch (error) {
    console.error('Error scheduling email:', error);
    res.status(500).json({ error: 'Error scheduling email' });
  }
};

const sendScheduledEmails = async () => {
  try {
    const now = new Date();
    const emailsToSend = await ScheduledEmail.find({
      scheduledTime: { $lte: now },
      status: 'pending',
    });

    if (emailsToSend.length === 0) {
      console.log('No emails to send at this time.');
      return;
    }

    let config = {
      service: "gmail",
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    };

    let transporter = nodemailer.createTransport(config);

    for (const email of emailsToSend) {
      try {
        let message = {
          from: EMAIL,
          to: email.to,
          subject: email.subject,
          html: email.body,
        };

        await transporter.sendMail(message);
        email.status = 'sent';
        await email.save();
        console.log(`Email sent to ${email.to}`);
      } catch (error) {
        console.error(`Error sending email to ${email.to}:`, error);
        email.status = 'failed';
        await email.save();
      }
    }
  } catch (error) {
    console.error('Error in sendScheduledEmails:', error);
  }
};

module.exports = {
  scheduleEmail,
  sendScheduledEmails,
};
