require("dotenv").config();

const port = process.env.PORT || 7000;

const favicon = require('serve-favicon');
const express = require('express');
const path = require('path');

const mainRoutes = require("./routes/main");

const app = express()

app.use(favicon("./www/essential/media/favicon.ico"));
app.set('view-engine', 'ejs')

// app.all(/.*/, function(req, res, next) {
// let host = req.header("host");
//  if (host.match(/^www\..*/i)) {
/*    next();
  } else {
    console.log(req.originalUrl)
    res.redirect(301, "https://www." + host + req.originalUrl);
  }
});
 */
app.use("/", mainRoutes)

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
