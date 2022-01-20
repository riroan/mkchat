import React, {useState, useEffect} from 'react'
import axios from 'axios'
import MessageBox, {BoxType} from './components/MessageBox'
import setupAxios from './cfg'

const func = (data:Array<string>)=>{
  let result = []
  for(let i of data){
    result.push(<MessageBox msg={i} type={BoxType.NONE}></MessageBox>)
  }
  return result
}

const App = () => {
  const [msg, setMsg] = useState('')
  const [data, setData] = useState([])
  setupAxios()
  const onClick=()=>{
    axios.post('/msg',
    {"text":msg}
    ).then((response)=>{
      console.log(response)
    }).catch((response)=>{
      console.log("error!")
    })
    axios.get('/msg'
    ).then((response)=>{
      setData(response.data.msg)
    }).catch((response)=>{
      console.log("error!")
    })
    setMsg('')
  }
  const onKeyPress = (e:React.KeyboardEvent)=>{
    if (e.key==='Enter' && msg !==''){
      onClick();
    }
  }

  return (
    <div className="App">
      <input type="text" value={msg} onChange={(e)=>{
        setMsg(e.target.value)
      }} onKeyPress={onKeyPress}/>
      <button onClick={onClick} disabled={msg===''}>send</button>
      <div>
        {func(data)}
      </div>
    </div>
  )
}

export default App;