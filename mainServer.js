const port = process.env.PORT || 7000;

console.log(`Enviroment: **${process.env.NODE_ENV}**`)

const favicon = require('serve-favicon')
const express = require('express')
const path = require('path')

const app = express()

app.use(favicon("./www/Essential/media/favicon.ico"));

app.use(express.static(path.join(__dirname, 'www'),{extensions:['html']}))

app.use((req, res) => {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    const errorPages = [ "404_1.html", "404_2.html" ]

    res.sendFile( __dirname + "/errors/" +
    errorPages[Math.floor(Math.random() * errorPages.length)] )
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

app.listen(port, ()=>{
    console.log("Listening on port: " + port)
})