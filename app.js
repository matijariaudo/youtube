const { Client , LocalAuth ,MessageMedia} = require('whatsapp-web.js');
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
    res.json(qri)
});
app.listen(process.env.PORT)
console.log("app corriendo en ",process.env.PORT)