const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGOURL);

module.exports = {
    name: "connected",
    execute() {
        console.log("\x1B[93m[Database Status]: Connecting...\x1B[39m")
    },
}