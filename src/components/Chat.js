import React, { useEffect, useState } from 'react'
import './Chat.css'
import { Scrollbars } from 'react-custom-scrollbars'
const Chat = ({socket,userName,roomName}) => {
  const [userMessage,setUserMessage] = useState("")
  const [messageList,setMessageList] = useState([])
  const sendMessage = async(e)=>{
    e.preventDefault()
    if(userMessage!==""){
      const messageData = {
        room:roomName,
        author: userName,
        message: userMessage,
        time: new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()
      }
      await socket.emit("send_message",messageData)
      setMessageList((list)=>[...list,messageData])
    }
  }
  useEffect(()=>{
    socket.on("receive_message",(data)=>{
      setMessageList((list)=>[...list,data])
      
    })
    return () => socket.removeListener('receive_message')
  },[socket])
  return (
    <>
    <div className="main-section">
      
        <div className="showmessage">
        <Scrollbars style={{height:"100%"}}>
          {messageList.map((message)=>{
            return (<><div className={`message ${userName === message.author ? "right" : "left"}`} key={message.message.substring(0, message.length - 1)}>{message.author}:  {message.message}</div>
            
            </>
            
          )
          })}
            
            </Scrollbars>
            
        </div>
        
        
        <div className="sendmessage">
        </div>
            <form action="" id="send-container">
                
                <input type="text" placeholder="Enter text here" id="messageInp" onChange={(event)=>{
                  setUserMessage(event.target.value)
                }} 
                onKeyDown={(event)=>{event.key==="Enter" && sendMessage()}}
                value={userMessage}/>
                <button type="submit" id="btn" className="btn1" onClick={sendMessage}>Send</button>
            </form>
        
    </div>
    </>
  )
}

export default Chat
