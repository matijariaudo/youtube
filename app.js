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
        yt.convertAudio({
            url: url,
            itag: 140,
            directoryDownload: __dirname+"/downloads",
            title: newName
            }, (a)=>{
            console.log("Bajando: %",a)
            }, ()=>{
            console.log("Se ha bajado")
            resolve(true)
        })       
    })
    
}


app.use(express.json())

app.get('*', async(req, res)=>{
    await descargar_video("https://www.youtube.com/watch?v=azdwsXLmrHEhttps://www.youtube.com/watch?v=azdwsXLmrHE","azdwsXLmrHE")
    res.json(randomstring.generate(7)+" se bajo azdwsXLmrHE" )
});

console.log("App corriendo en ",process.env.PORT)
app.listen(process.env.PORT)

