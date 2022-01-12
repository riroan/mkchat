import React, {useState} from 'react';
import axios from 'axios';


const App =()=> {
  const [msg, setMsg] = useState('');
  return (
    <div className="App">
      <header className="App-header">
        <input type="text" onChange={(e)=>{
          setMsg(e.target.value)
        }} />
        <button onClick={()=>{
          axios.post('http://localhost:8000/msg',
          {
            'msg':msg
          },
          {
            headers:{
            'Content-type':'application/json',
            'Accept':'application/json'
            }
          }).then((response)=>{
            console.log(response)
          }).catch((response)=>{
            console.log("error!")
          })
          console.log(msg)
          }}>send</button>
      </header>
    </div>
  );
}

export default App;