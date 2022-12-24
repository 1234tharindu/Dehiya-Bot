const mongoose = require("mongoose");
const config = require("./config");

mongoose.connect("mongodb+srv://5h3ld0r:Timodh1@@cluster0.cfpkpjq.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("[✅ DataBase] Connected!");
});
module.exports = mongoose;
