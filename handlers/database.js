const mongoose = require("mongoose");

mongoose.connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
    console.log("[✅ DataBase] Connected!");
});
module.exports = mongoose;
