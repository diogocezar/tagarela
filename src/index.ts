import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;
const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
const secret = process.env.TAGARELA_SECRET;

if (!discordWebhookUrl) {
  throw new Error("🚨 Webhook URL is not defined on .env file");
}

if (!secret) {
  throw new Error("🚨 Secret is not defined on .env file");
}

app.use(express.json());

app.post("/send", async (req: any, res: any) => {
  const { message } = req.body;
  const signature = req.headers["api-key"];

  if (!signature || signature !== secret) {
    console.log(`🚨 Someone trying to access without 'api-key'.`);
    return res.status(401).send("🚨 You shall not pass!");
  }

  if (!message) {
    console.log(`🚨 Someone trying send without message.`);
    return res
      .status(400)
      .send("🚨 You need to provide a message to be sended on that channel.");
  }

  try {
    await axios.post(discordWebhookUrl, {
      content: message,
    });
    console.log(`🎉 ${message} has sucessfuly sent.`);
    return res.status(200).send("🎉 Message has sucessfully sent.");
  } catch (error) {
    console.error("😢 Oops, something wrong here: ", error);
    return res.status(500).send("😢 Oops, something wrong here.");
  }
});

app.listen(port, () => {
  console.log(`🤖 Server is running on http://localhost:${port}`);
});
