const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const {Server} = require('socket.io')
const path = require("path")

app.use(cors())
app.use(express.static(path.join(__dirname,"../build")))

const server = http.createServer(app)
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,'../build/index.html'))
})
const io = new Server(server,{
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET,POST"]
    },
})



io.on('connection',(socket)=>{
    console.log(`User id is ${socket.id}`)
    socket.on('join_room',(data)=>{
        socket.join(data)
        console.log(`User with id : ${socket.id} join room: ${data}`)
    })
    socket.on("send_message",(data)=>{
        socket.to(data.room).emit("receive_message",data)
    })
    socket.on('disconnect',()=>{
        console.log("User disconnected ",socket.id)
    })
})

server.listen(3001,()=>{
    console.log("Server is Running")
})