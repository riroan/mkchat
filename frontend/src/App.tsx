import React, {useState, useEffect} from 'react';
import axios from 'axios';

const func = (data:Array<string>)=>{
  let result = []
  for(let i of data){
    result.push(<li>{i}</li>)
  }
  return result
}

const App = () => {
  const [msg, setMsg] = useState('')
  const [data, setData] = useState([])

  const headers = {
    headers:{
    'Content-type':'application/json',
    'Accept':'application/json'
    }
  };
  const onClick=()=>{
    axios.post('http://localhost:8000/msg',
    {"text":msg},
    headers
    ).then((response)=>{
      console.log(response)
    }).catch((response)=>{
      console.log("error!")
    })
    axios.get('http://localhost:8000/msg'
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
        <ul>
          {func(data)}
        </ul>
      </div>
    </div>
  )
}

export default App;