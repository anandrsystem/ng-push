const dotenv = require('dotenv');
dotenv.config({ path: 'variables.env' });

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;
const webPush = require('web-push');
webPush.setVapidDetails('mailto:anand.mittal@rsystems.com', publicVapidKey, privateVapidKey);

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'src')));

app.get("/", function (req, res) {
  res.sendFile("./index.html");
});

app.post('/subscribe', (req, res) => {
  const { subscription, title, message } = req.body;
  res.status(201).json({});

  const payload = JSON.stringify({
    title: title,
    message, message
  });
  webPush.sendNotification(subscription, payload)
    .catch(error => console.error(error));
});

// Start Server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Express server listening on port ${server.address().port}`);
});
