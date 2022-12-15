const { Client , LocalAuth ,MessageMedia} = require('whatsapp-web.js');
var randomstring = require("randomstring");
const express = require('express')
const app = express()
require('dotenv').config()
let qri="NO";

client = new Client({authStrategy: new LocalAuth({ clientId: "Youtube" })});
client.on('qr', (qr) => {console.log(qr);
    qri=qr;
});


app.use(express.json())

app.get('*', function (req, res) {
    res.json(randomstring.generate(7) )
});
console.log("App corriendo en ",process.env.PORT)
app.listen(process.env.PORT)

