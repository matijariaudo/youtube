const express = require('express')

const app = express()
require('dotenv').config()

app.use(express.json())

app.get('/:valor', function (req, res) {
    res.json(req.params.valor)
});
app.listen(process.env.PORT)
