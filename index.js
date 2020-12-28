const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.json());
require("./routes")(app);




app.listen(PORT, function () {
  console.log(`App running on port ${PORT}`);
});

