const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  const intent = req.body.queryResult.intent.displayName;
  const parameters = req.body.queryResult.parameters;

  if (intent === "order_summary") {
    const pizza = parameters.pizza_typee ? `🍕 ${parameters.pizza_typee} ${parameters.pizza_qty} Pizza(s)\n` : "";
    const burger = parameters.burger_typee ? `🍔 ${parameters.burger_typee} ${parameters.burger_qty} Burger(s)\n` : "";
    const biryani = parameters.biryani_typee ? `🍛 ${parameters.biryani_typee} ${parameters.biryani_qty} Biryani(s)\n` : "";
    const drink = parameters.drink_typee ? `🥤 ${parameters.drink_typee} ${parameters.drink_qty} Cold drinks\n` : "";

    const summary = `🧾 Your order summary:\n${pizza}${burger}${biryani}${drink}`;
    res.json({ fulfillmentText: summary });
  } else {
    res.json({ fulfillmentText: "Webhook is live!" });
  }
});

app.get("/", (req, res) => res.send("Webhook Server Running"));
app.listen(3000, () => console.log("Server running on port 3000"));
