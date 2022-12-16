const { Client } = require('whatsapp-web.js');
var randomstring = require("randomstring");
const express = require('express')
require('dotenv').config()
const app = express()

console.clear()
let qrcode="NO QR"
const client = new Client();
client.on('qr', (qr) => {console.log('QR RECEIVED', qr);qrcode=qr;});
client.on('ready', () => {console.log('Client is ready!');});
client.initialize()



app.use(express.json())

app.get('*', async(req, res)=>{
    res.json(randomstring.generate(7)+" se bajo azdwsXLmrHE qr: "+qrcode )
});

console.log("App corriendo en ",process.env.PORT)
app.listen(process.env.PORT)

