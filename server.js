const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

app.get("/getBinancePrice", async (req, res) => {
  const { symbol } = req.query;
  if (!symbol) return res.status(400).send({ error: "Missing symbol" });

  try {
    const response = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).send({ error: "Binance API error", details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
