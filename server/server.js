const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const pug = require("pug");
const fetch = require("node-fetch");
const path = require("path");

const app = express();

app.set("view engine", "pug");

app.use(helmet.noSniff());
app.use(
  cors({
    allowedHeaders: ["sessionId", "Content-Type"],
    exposedHeaders: ["sessionId"],
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);
app.use("/static", express.static(path.resolve(__dirname, "../assets")));
app.set("views", path.resolve(__dirname, "../views"));

app.get('/loaderio-c7b0b6e53772ea8b720203d11cec64e1', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'assets', 'loaderio-c7b0b6e53772ea8b720203d11cec64e1.txt'));
});

app.get("/:product_id", (req, res) => {
  res.status(200).render("index", {
    descService: `${process.env.DESC_SERVICE}/bundle.js`,
    // overviewService: process.env.OVERVIEW_SERVICE,
    // traitsService: process.env.TRAITS_SERVICE,
    // imageService: process.env.IMAGE_SERVICE,
    // priceService: process.env.PRICE_SERVICE,
    // relatedService: process.env.RELATED_SERVICE,
    // otherPopService: process.env.OTHER_POP_SERVICE,
    // legalService: process.env.LEGAL_SERVICE,
  });
});

/**
 * API REROUTING
 */
// Description service
app.get(['/description/title/:product_id', '/description/:product_id', '/genre/:product_id'], async (req, res) => {
  let product_id = parseInt(req.params.product_id);
  if (Number.isNaN(product_id) || product_id < 1) {
    return res.status(400).send('Invalid product ID.');
  }

  try {
    let result = await fetch(`${process.env.DESC_SERVICE}${req.path}`)
      .then(rsp => req.path.includes('title') ? rsp.text() : rsp.json());
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('An internal error occurred.');
  }
});


app.get("/", (req, res) => {
  res.redirect("/21");
});

module.exports = app;
