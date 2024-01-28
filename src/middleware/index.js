// Middleware to authorize the webhook request
export const authorizeWebhook = (req, res, next) => {
  // Assuming that hostaway webhook included some secret or api key for authentication
  const providedToken = req.headers["authorization"];

  const webhookSecretToken = process.env.WEBHOOK_SECRET;

  if (!providedToken || providedToken !== `Bearer ${webhookSecretToken}`) {
    return res.status(403).send("Unauthorized");
  }

  next();
};
