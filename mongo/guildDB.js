const mongoose = require("mongoose");

const guildDB = new mongoose.Schema({
  guild: { type: String, default: '' },
  channel: { type: String, default: '' },
  message: { type: String, default: '[member:mention] Welcome to [guild:name]' },
});

module.exports = mongoose.model(`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`, guildDB);