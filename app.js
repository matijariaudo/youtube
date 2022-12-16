const { Client , LocalAuth ,MessageMedia} = require('whatsapp-web.js');
var randomstring = require("randomstring");
const express = require('express')
const app = express()
const yt = require("yt-converter");
require('dotenv').config()

let qri="NO";

function descargar_video(url,newName)
{
    return new Promise((resolve, reject) => {
        client = new Client();
        client.on('qr', (qr) => {console.log(qr);
            resolve(qr)
        });      
    })
    
}


app.use(express.json())

app.get('*', async(req, res)=>{
    const qr=await descargar_video("https://www.youtube.com/watch?v=azdwsXLmrHEhttps://www.youtube.com/watch?v=azdwsXLmrHE","azdwsXLmrHE")
    res.json(randomstring.generate(7)+" se bajo azdwsXLmrHE qr: "+qr )
});

console.log("App corriendo en ",process.env.PORT)
app.listen(process.env.PORT)

