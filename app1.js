const fs = require('fs');
const ytdl = require('ytdl-core');
var converter = require('video-converter');

console.clear();
console.log("INICIOOOOO")

ytdl('https://www.youtube.com/watch?v=mEcv_PyDlso').pipe(fs.createWriteStream('video1.mp4'));

setTimeout(() => {
    console.log("convirtiendo") 
}, 10000);


 
converter.setFfmpegPath(`C:\ffmpeg\bin`, function(err) {
    console.log(err);
});
 
// convert mp4 to mp3
converter.convert("video1.mp4", "sample.mp3", function(err) {
    if (err) throw err;
    console.log("done");
});