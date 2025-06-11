const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  const intent = req.body.queryResult.intent.displayName;
  const parameters = req.body.queryResult.parameters || {};

  if (intent === "order_summary") {
    let summary = "🧾 Your order summary:\n";

    if (parameters.pizza_qty) summary += `🍕 ${parameters.pizza_typee} ${parameters.pizza_qty} Pizza(s)\n`;
    if (parameters.burger_qty) summary += `🍔 ${parameters.burger_typee} ${parameters.burger_qty} Burger(s)\n`;
    if (parameters.biryani_qty) summary += `🍛 ${parameters.biryani_typee} ${parameters.biryani_qty} Biryani(s)\n`;
    if (parameters.drink_qty) summary += `🥤 ${parameters.drink_typee} ${parameters.drink_qty} Cold drink(s)\n`;

    return res.json({ fulfillmentText: summary.trim() });
  }

  // Fallback default response
  return res.json({ fulfillmentText: "✅ Webhook is live and listening!" });
});

app.get("/", (req, res) => res.send("🚀 Dialogflow Webhook Server is Running"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
