module.exports = {
    name: "err",
    execute() {
        console.log(`\x1B[91mAn error occurred with the database:\n${err}\x1B[39m`)
    },
}