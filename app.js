const yt = require("yt-converter");
const express = require('express')
const app = express()

function buscar_video(url,newName)
{
    yt.getInfo(url).then(info => {
    descargar_video(url,newName);
    }).catch(e=>{
    console.log("HAy error")
    });
}

function descargar_video(url,newName)
{
    yt.convertAudio({
    url: url,
    itag: 140,
    directoryDownload: __dirname,
    title: newName
    }, (a)=>{
    console.log("Bajando: %",a)
    }, ()=>{
    console.log("Se ha bajado!")
})}

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



app.get('/:url', function (req, res) {
    nam="M-"+fecha(new Date());
    buscar_video("https://www.youtube.com/watch?v="+req.params.url,nam)
    res.send(__dirname+"/"+nam+".mp3")
})

app.get('*', function (req, res) {
    console.log("NO entro nada")
    res.send(__dirname)
})
  
app.listen(8080)