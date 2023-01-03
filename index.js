const net = require('net')

const PORT = 60001
const host = '192.168.0.'

const buffer = new ArrayBuffer(5)
const view = new Uint8Array(buffer)

view[0] = 0xAA
view[1] = 0
view[2] = 1
view[3] = 0x18
view[4] = 0x50

console.log(Array.from(view).map((d)=>d.toString(16).toUpperCase()))

const client = net.connect(PORT,host,()=>{
  console.log('connected to server')
  client.write(view)
})

client.on('data', data => {
  const dataView = new Uint8Array(data)
  const hexData = Array.from(dataView).map((d)=>d.toString(16).toUpperCase())
  const wet = Number(((dataView[5]*0x100) + dataView[6]).toString(10)) *0.1
  const temp = Number(((dataView[7]*0x100) + dataView[8]).toString(10)) *0.1
  console.log('clientHex-> ' + hexData)
  console.log('clientDec-> ' + dataView)
  console.log('湿度:'+wet+'%')
  console.log('温度:'+temp+'℃')
  client.destroy()
});

client.on('close', () => {
  console.log('client-> connection is closed')
})
