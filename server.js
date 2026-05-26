const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const TOKEN = process.env.TOKEN;
const PHONE_ID = process.env.PHONE_ID;

app.post("/webhook", async (req, res) => {
  const msg = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

  if (msg) {
    const from = msg.from;
    const text = msg.text?.body?.toLowerCase();

    let reply = `🔥 GIBSONFX ACADEMY

Welcome Trader 📊

Choose:
1️⃣ Signals
2️⃣ Mentorship
3️⃣ Bot
4️⃣ VIP`;

    if (text === "1") reply = "📈 Signals: Reply JOIN";
    if (text === "2") reply = "🎓 Mentorship: Reply START";
    if (text === "3") reply = "🤖 Bot: Reply BOT";
    if (text === "4") reply = "💎 VIP: Reply VIP";

    await axios.post(`https://graph.facebook.com/v18.0/${PHONE_ID}/messages`, {
      messaging_product: "whatsapp",
      to: from,
      text: { body: reply }
    }, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      }
    });
  }

  res.sendStatus(200);
});

app.listen(3000, () => console.log("Bot running 🚀"));
