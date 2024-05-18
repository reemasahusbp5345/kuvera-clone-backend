import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Portfolio } from "./src/model/portfolio.model.js";
import ConnectDB from "./src/db/index.js";
import { Stock } from "./src/model/stock.model.js";

const app = express();
const port = 8000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// CRUD Routes
app.get("/portfolio", async (req, res) => {
  try {
    const portfolios = await Portfolio.find().populate('stock');
    res.status(200).json(portfolios);
  } catch (err) {
    res.status(500).send(err);
  }
});
app.get("/stocks", async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.status(200).json(stocks);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/portfolio", async (req, res) => {
  try {
    const stock = await Stock.findById(req?.body?.id);
    if (!stock) {
      throw new Error("Stock not found");
    }
    const newPortfolio = new Portfolio({
      value: req?.body?.value,
      stock,
    });
    await newPortfolio.save();
    res.status(200).json(newPortfolio);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/stocks", async (req, res) => {
  const stock = new Stock(req.body);
  try {
    const savedStock = await stock.save();
    res.status(200).json(savedStock);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put("/portfolio/:id", async (req, res) => {
  try {
    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedPortfolio);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/portfolio/:id", async (req, res) => {
  try {
    await Portfolio.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Portfolio item deleted" });
  } catch (err) {
    res.status(500).send(err);
  }
});

ConnectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
    });
  })
  .catch((err) => console.log("App connection failed", err));
