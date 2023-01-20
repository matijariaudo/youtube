console.log("Inicial")
const qrcode = require('qrcode-terminal');
const { Client , LocalAuth ,MessageMedia} = require('whatsapp-web.js');
const express = require('express')
const app = express()
require('dotenv').config()

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

app.get('/:nro', async(req, res)=>{
    const {nro}=req.params;
    const {to,msg,url}=req.body;
    console.log(nro,to,msg,url)
    if(!wsp_init){
        return res.status(200).json({"error":"Aún no se ha iniciado sesión el wsp"});
    }else{
        enviarMensaje({to,msg})
        return res.status(200).json({"error":"Enviando el wsp"});
    }
})

app.get('*', function (req, res) {
    console.log("NO entro nada")
    res.send(__dirname)
})


const enviarMensaje = async({to,msg,url})=>{
    const text = msg;
    const chatId = to.substring(1) + "@c.us";
    console.log(client)
    client.sendMessage(chatId, text);
    if(url){
        const media=await MessageMedia.fromFilePath(url)
        client.sendMessage(chatId, media,{sendMediaAsDocument:true});
    }
}

let client;
let wsp_init=false;
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
        client.on('ready', async()=>{console.log("readyyyy");wsp_init=true;resolve()});
        client.on('message', async(message) => {
            enviarMensaje({to:"+"+message.from.split("@")[0],msg:"Tu mensaje fue : "+message.body+", no lo puedo entender."})
        });
        client.initialize()
    })
}

const init=async()=>{
console.clear()
app.listen(process.env.PORT)
console.log("Listen ",process.env.PORT)
await iniciarWA()
}

init()