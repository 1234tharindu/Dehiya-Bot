const { set, connect } = require('mongoose');

set('strictQuery', true);
connect(process.env.MONGOURL);
console.log(process.env.MONGOURL);

module.exports = {
    name: "connecting",
    execute() {
        console.log("\x1B[93m[Database Status]: Connecting...\x1B[39m")
    },
}