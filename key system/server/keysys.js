const mongoose = require("mongoose");

const keysys = new mongoose.Schema({
    IP: String,
    Position: Number,
    HWID: String
});

module.exports = mongoose.model("KeySys", keysys);