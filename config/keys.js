if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else {
  // Development
  module.exports = require("./dev"); // Exportamos las claves de desarrollo
}
