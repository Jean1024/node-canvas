var fs = require('fs')
var express = require('express')
var app = express()
const canvasWidth = 256
const canvasHeight = 256
const { createCanvas, loadImage,Image } = require('canvas')
fs.readFile(__dirname + '/imgs/temp.png', function(err, squid){
  if (err) throw err;
  img = new Image;
  img.src = squid;
  // 监听请求
  app.get('/temp/:z/:x/:y',function (req,res) {
    var z = req.params.z
    var x = req.params.x
    var y = req.params.y
    var grid = 2560/Math.pow(2,z)
    var top = y * grid + 1
    var left = x * grid + 1
    // left = left< 10?10:left
    // left = left> 2550?2550:left
    // 创建canvas
    const canvas = createCanvas(canvasWidth, canvasHeight)
    const ctx = canvas.getContext('2d')

    ctx.drawImage(img,left,top,grid,grid,0,0,256,256);
    var imgData = canvas.toDataURL()
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');
    res.writeHead(200, "Ok");
    res.write(dataBuffer,"binary"); //格式必须为 binary，否则会出错
    res.end();
  })
});
app.listen(10555)
console.log('Listen on 10555........')
