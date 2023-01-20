console.log("Inicial")
const qrcode = require('qrcode-terminal');
const { Client , LocalAuth ,MessageMedia} = require('whatsapp-web.js');
const yt = require("yt-converter");
const express = require('express')

const app = express()
require('dotenv').config()

function buscar_video(url)
{
    return new Promise((resolve, reject) => {
        yt.getInfo(url).then(info => {
        resolve(info)
        }).catch(e=>{
        resolve()
        });    
    })
    
}

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

function fecha(fc){
    fc=new Date(fc);
    ms=fc.getMonth()+1;ms<10?ms="0"+ms:true;
    d=fc.getDate();d<10?d="0"+d:true;
    h=fc.getHours();h<10?h="0"+h:true;
    m=fc.getMinutes();m<10?m="0"+m:true;
    s=fc.getSeconds();s<10?s="0"+s:true;
    return h+"-"+m+"-"+s+" "+d+"-"+ms+"-"+fc.getFullYear();
}

console.clear()

app.use(express.json())

app.get('/:url', async(req, res)=>{
    nam="a"+fecha(new Date());
    cod=req.params.url;
    data=await buscar_video("https://www.youtube.com/watch?v="+cod)
    if(!data){
        return res.status(200).json({"error":"No es un video"})
    }else{
        console.log(req.params.url)
        await descargar_video("https://www.youtube.com/watch?v="+cod,nam)
        return res.status(200).json({"error":"Se ha descargado"})
    }
})

app.get('*', function (req, res) {
    console.log("NO entro nada")
    res.send(__dirname)
})

const buscar_yt=async(cod)=>{
    nam="yt - "+fecha(new Date());
    data=await buscar_video("https://www.youtube.com/watch?v="+cod)
    if(!data){
        return "NO"
    }else{
        console.log(data.title)
        await descargar_video("https://www.youtube.com/watch?v="+cod,cod)
        return cod;
    }
}

const enviarMensaje = async({to,msg,url})=>{
    const number = to;
    const text = msg;
    const chatId = number.substring(1) + "@c.us";
    client.sendMessage(chatId, text);
    if(url){
        const media=await MessageMedia.fromFilePath(url)
        client.sendMessage(chatId, media,{sendMediaAsDocument:true});
    }
}

let client;
const iniciarWA=()=>{
    return new Promise((resolve, reject) => {
        console.log("Iniciando wsp..")
        client = new Client({authStrategy: new LocalAuth({ clientId: "Youtube" }), puppeteer: {
            headless: true,
            args: ['--no-sandbox']
        }});
        client.on('qr', (qr) => {
            console.log(qr);
            qrcode.generate(qr, {small: true})
        });
        client.on('ready', async()=>{console.log("readyyyy");resolve()});
        client.on('message', async(message) => {
            console.log("+"+message.from.split("@")[0],message.body);
            enviarMensaje({to:"+"+message.from.split("@")[0],msg:"Tu mensaje fue : "+message.body+", no lo puedo entender."})
            if(message.body.indexOf("/youtu.be/")>=0){
                const rta=await buscar_yt(message.body.split("/youtu.be/")[1]);
                enviarMensaje({to:"+"+message.from.split("@")[0],msg:"Aquí te va tu tema",url:"downloads/"+rta+".mp3"})
            }
        });
        client.initialize()
    })
}

const init=async()=>{
console.clear()
app.listen(process.env.PORT)
console.log("Listen ",process.env.PORT)
//await iniciarWA()
}

init()