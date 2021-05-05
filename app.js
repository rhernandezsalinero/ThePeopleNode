const express = require('express')
const createError = require('http-errors')
const path = require('path')
const app = express()
const router = require('./src/routes/routes.js')
const connection = require('./src/connection')
const helmet = require("helmet");
const passport = require("passport")
const cors = require('cors')

var corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token', 'content-type', 'X-Requested-With', 'Authorization', 'Accept', 'Origin'],
}

app.use(cors(corsOption))

app.use(passport.initialize())

app.use(helmet());

app.use(express.json())

app.use(express.urlencoded({
    extended: true
}))

connection.then(() => {
    console.log('Conectado a la base de datos...')
    app.listen(3000, () => {
        console.log("Servidor iniciado")
    })
}).catch(function (err) {
    console.log(`Error al conectar a la base de datos: ${err}`)
});

app.use(router)

app.use(function (req, res, next) {
    next(createError(404));
})

app.use(express.static(path.join(__dirname, './public')))

app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    if (err.status == 404) {
        res.sendFile(path.join(__dirname, './public/404.html'))
    } else {
        res.json({
            status: err.status,
            error: err.message
        })
    }
})