const express = require("express");
const app = express();
const db = require("./db");
const data = db.models.Data;

//Defaults(redirects) to /bookmarks
app.get("/", async (req, res, next) => {
  res.redirect("/bookmarks");
});

app.get("/bookmarks", async (req, res, next) => {
  try {
    const datas = await data.findAll();
    res.send(`
    <ul>
    ${datas
      .map(
        (ele, idx, arr) => `
        <li>
        Name: ${arr[idx].name}<br>
        URL: ${arr[idx].URL}<br>
        Category: ${arr[idx].category}<br><br>
        </li>
        `
      )
      .join("")}
    
    
    
    
    </ul>
    `);
  } catch (error) {
    next(error);
  }
});

//Seeds data table and sets port to 3000
const init = async () => {
  await db.syncAndSeed();
  const port = process.env.PORT || 3000;
  app.listen(port);
};

init();
