const express = require('express');
const axios = require('axios');
const cron = require('node-cron');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;
const SUBGRAPH_URL = '<YOUR_SUBGRAPH_URL>';
const TARGET_ADDRESS = '<TARGET_EH_ADDRESS>';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '<YOUR_EMAIL>',
    pass: '<YOUR_EMAIL_PASSWORD>';
  },
});

const checkTransfers = async() => {
  try {
    const response = await axios.post(SUBGRAPH_URL, {
      query: `
        {
          transfers(firts:5, orderBy: timestamp, orderDirections: desc, where: { to: "${TARGET_ADDRESS}"}) {
            id
            from
            to
            value
            timestamp
          }
        }
        `,
    });

    const transfers = response.data.data.transfers;
    transfers.forEach((transfer) => {
      sendNotification(transfer);
    });
  } catch (error) {
    console.error('Error fetching transfers:', error);
  }
};

const sendNotification = (transfer) => {
  const mailOptions = {
    from: '<YOUR_EMAIL>',
    to: '<RECIPIENT_EMAIL>',
    subject: 'New USDC Transfer Notification',
    text: New transfer detected!\nFrom: ${transfer.from}\nTo: ${transfer.to}\nValue: ${transfer.value.toString()}\nTimestamp: ${transfer.timestamp},
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

// Schedule the check every minute
cron.schedule('* * * * *', () => {
  console.log('Checking for new transfers...');
  checkTransfers();
});

app.listen(PORT, () => {
  console.log(Notification Bot running on port ${PORT});
});
