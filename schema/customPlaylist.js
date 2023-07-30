const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
 userID: String,
 songs: [String],
})

module.exports = mongoose.model('customPlaylist', Schema);