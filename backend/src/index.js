import express from 'express'
import http from 'http'
import cors from 'cors'
import { Server } from 'socket.io'

const app = express()
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['*'],
}

app.use(cors(corsOptions))
app.get('/', (req, res) => {
  res.send('Hello, World')
})

const roomName = 'Chat Room'

const httpServer = http.createServer(app)
const wsServer = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3000'],
    credentials: true,
  },
})

wsServer.on('connection', socket => {
  socket['nickname'] = '익명'
  socket.join('Chat Room')
  socket.to(roomName).emit('welcome', socket.nickname)
  socket.on('new_message', msg => {
    socket.to(roomName).emit('new_message', socket.nickname, msg)
  })
})

httpServer.listen(8000, () => console.log('Listening on ws://localhost:8000'))
