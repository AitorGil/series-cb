/*
    Inicia la aplicación express que contiene el servidor.
*/
const express = require("express");

const app = express();

app.get("/", (request, response) => {
  response.send("Hello World");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}.`);
});

module.exports = app;
