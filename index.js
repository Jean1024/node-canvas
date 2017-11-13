const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(200, 200)
const ctx = canvas.getContext('2d')
const fs = require('fs')
// Write "Awesome!"
ctx.font = '30px Impact'
ctx.rotate(0.1)
ctx.fillText('Awesome!', 50, 100)

// Draw line under text
var text = ctx.measureText('Awesome!')
ctx.strokeStyle = 'rgba(0,0,0,0.5)'
ctx.beginPath()
ctx.lineTo(50, 102)
ctx.lineTo(50 + text.width, 102)
ctx.stroke()

// Draw cat with lime helmet
loadImage('./img/8.png').then((image) => {
  ctx.drawImage(image, 50, 0, 70, 70)

  // 保存base64位图片  new Buffer接收到base64编码，不能带data:URL，而使用canvas . toDataURL()导出的base64编码会带data:URL，
  // 所以需要先过滤掉
  // 类似这样的一段“data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0”
  var imgData = canvas.toDataURL()
  var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
  var dataBuffer = new Buffer(base64Data, 'base64');
  fs.writeFileSync('./text.png',dataBuffer)
  console.log('success!')
})

