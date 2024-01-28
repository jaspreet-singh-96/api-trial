const express = require("express");
const bodyParser = require("body-parser");
const { authorizeWebhook } = require("./middleware");
const { lockDoor } = require("./service/schlage");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Endpoint to handle the webhook POST request
app.post("/webhook", authorizeWebhook, async (req, res) => {
  // Assuming the webhook payload contains information in the request body
  const reservationData = req.body;

  // Some logic to parse and verify the data sent by webhook
  try {
    const result = await lockDoor(reservationData);

    // Do something with result, e.g. Send email notification to user

    // Respond to the webhook request
    res.status(200).send("Success");
  } catch (error) {
    res.status(500).send("Failed");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Webhook listener server is running at http://localhost:${port}`);
});
