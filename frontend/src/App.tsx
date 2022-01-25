import React, { useState, useEffect } from 'react'
import MessageBox, { BoxType } from './components/MessageBox'
import io from 'socket.io-client'
import './App.css'

type Message = {
  name: string
  msg: string
  type: BoxType
}
const socket = io('ws://localhost:8000')

const App = () => {
  const [msg, setMsg] = useState('')
  const [data, setData] = useState(Array<Message>())
  const [msgList, setMsgList] = useState([])
  const roomName = 'Chat Room'
  const addMessage = (nickname, message, type) => {
    setData([...data, { name: nickname, msg: message, type: type }])
    console.log(data)
  }
  const validMsg = () => {
    return msg.replace(/\s/g, '').length !== 0
  }
  const handleSubmit = e => {
    e.preventDefault()
    socket.emit('new_message', msg)
    addMessage('You', msg, BoxType.RIGHT)
    setMsg('')
  }
  useEffect(() => {
    socket.on('new_message', (nickname, message) => {
      addMessage(nickname, message, BoxType.LEFT)
    })
    socket.on('welcome', nickname => {
      addMessage(nickname, `${nickname}이 접속하셨습니다.`, BoxType.NONE)
    })
  }, [])

  useEffect(() => {
    const t = data.map((d, index) => (
      <li key={index}>
        <MessageBox msg={d.msg} type={d.type} />
      </li>
    ))
    setMsgList(t)
  }, [data])

  return (
    <div className="App">
      <h1>{roomName}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={msg}
          onChange={e => {
            setMsg(e.target.value)
          }}
        />
        <button disabled={!validMsg()}>Send</button>
      </form>
      <ul>{msgList}</ul>
    </div>
  )
}

export default App
