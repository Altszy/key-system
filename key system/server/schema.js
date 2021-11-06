const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    HWID: String,
    IP: String,
    Key: String,
    EndsAt: Number,
})

module.exports = mongoose.model('Key', schema);