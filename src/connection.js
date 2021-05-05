const mongoose = require("mongoose")

const password = "ejemplomongo"
const dbname = "people"
const user = "rubenadmin"
const host = "cluster0.tgiam.mongodb.net"

const uri = `mongodb+srv://${user}:${password}@${host}/${dbname}?retryWrites=true&w=majority`
module.exports = mongoose.connect(uri,
    {
        useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true
    })