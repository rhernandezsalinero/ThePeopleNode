const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
    name: String,
    surname: String,
    picture: String,
    date: Date,
    profession: String,
    biography: String,
    savedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

const ProfileModel = mongoose.model("profile", ProfileSchema)
module.exports = ProfileModel