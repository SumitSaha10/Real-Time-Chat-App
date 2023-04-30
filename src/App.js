import {useState} from 'react'
import './App.css';
import io from 'socket.io-client'
import Chat from './components/Chat';
const socket  = io.connect("http://localhost:3001")
function App() {
  const [userName,setUserName] = useState("")
  const [roomName,setRoomName] = useState("")
  const[isJoin,setIsJoin] = useState(false)

  const handleSubmit = ()=>{

  }

  const joinRoom = ()=>{
    if(userName!=="" && roomName!==""){
      socket.emit("join_room",roomName)
      setIsJoin(true)
    }
    else{
      console.log("Failed to enter the room")
    }
    
  }
  
  return (
    <div className='app' style={{"marginTop":"3rem"}}>
      {!isJoin?
      <div className='container' style={{"width":"60vw"}}>
      <h3>Join the Chat</h3>
    <div className="mb-3">
  <label htmlFor="formGroupExampleInput" className="form-label">User Name</label>
  <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Jack..." 
  value={userName}
  onChange={(event)=>{
    setUserName(event.target.value)
  }}/>
</div>
<div className="mb-3">
  <label htmlFor="formGroupExampleInput2" className="form-label">Room Id</label>
  <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Room123..." 
  value={roomName}
  onChange={(event)=>{
    setRoomName(event.target.value)
  }}/>
</div>
<button type="button" className="btn btn-info" onClick={joinRoom}>Join Room</button>
</div>
:
      
      <Chat socket={socket} userName={userName} roomName={roomName}/>
    }
    </div>
  );
}

export default App;
