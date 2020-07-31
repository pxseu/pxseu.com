require("dotenv").config();

const port = process.env.PORT || 7000;
const ipList = JSON.parse(process.env.ipList);
console.log(ipList)

const favicon = require('serve-favicon');
const requestIp = require('request-ip');
const express = require('express');
const path = require('path');

const app = express()

app.use(favicon("./www/essential/media/favicon.ico"));
app.set('view-engine', 'ejs')

app.get("/about", async (req, res, next) => {
  const clientIp = requestIp.getClientIp(req);

  //if (ipList.some(ip => ip == clientIp)){
    return res.render("about.ejs", { hiddenText: JSON.parse(process.env.HiddenData) });
  //};
  //next();
});

app.use(express.static(path.join(__dirname, 'www'),{extensions:['html']}))

app.use((req, res) => {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    const errorPages = [ "404_1.html", "404_2.html" ];

    res.sendFile( __dirname + "/errors/" +
    errorPages[Math.floor(Math.random() * errorPages.length)] );
    return;
  };

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  };

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

app.listen(port, ()=>{
  console.error("\x1b[31m")
  console.log("\x1b[35m", `> Enviroment: **${process.env.NODE_ENV}**`);
  console.log("\x1b[35m", `> Listening on port: ${port}`, "\x1b[0m");
}); 
