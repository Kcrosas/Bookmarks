const express = require("express");
const app = express();
const db = require("./db");
//const { conn, syncAndSeed, data} = db;
const data = db.models.Data;

app.get("/", async (req, res, next) => {
  res.redirect("/bookmarks");
});

app.get("/bookmarks", async (req, res, next) => {
  try {
    const datas = await data.findAll();
    res.send(datas);
  } catch (error) {
    next(error);
  }
});

const init = async () => {
  await db.syncAndSeed();
  const port = process.env.PORT || 3000;
  app.listen(port);
};

init();
