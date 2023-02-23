import React, { useEffect,useState } from 'react'
import { useNavigate } from "react-router-dom";
import socketIo from "socket.io-client";

import "./Chat.css";
import sendLogo from "../../images/send.png";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../images/closeIcon.png";

const ENDPOINT = 'http://localhost:4500';
let socket;
let user;

const Chat = () => {
    const navigate = useNavigate();
    const [id, setid] = useState("");
    const [messages, setMessages] = useState([])

    const send = () => {
        const message = document.getElementById('chatInput').value;
        if(message){
            socket.emit('message', { message, id });
        }
        
        document.getElementById('chatInput').value = "";
    }

    // console.log(messages);
    useEffect(() => {

        user = localStorage.getItem('user');
        if(!user){
            navigate("/")
        }
        socket = socketIo(ENDPOINT, { transports: ['websocket'] });

        socket.on('connect', () => {
            // alert('Connected');
            setid(socket.id);

        })
        // console.log(socket);
        socket.emit('joined', { user })

        socket.on('welcome', (data) => {
            setMessages([...messages, data]);
            // console.log(data.user, data.message);
        })

        socket.on('userJoined', (data) => {
            setMessages([...messages, data]);
            // console.log(data.user, data.message);
        })

        socket.on('leave', (data) => {
            setMessages([...messages, data]);
            // console.log(data.user, data.message)
        })

        return () => {
            socket.emit('disconnected');
            socket.off();
        }
    }, [])

    useEffect(() => {

        if(!user){
            navigate("/")
        }
        socket.on('sendMessage', (data) => {
            setMessages([...messages, data]);
            // console.log(data.user, data.message, data.id);
        })
        return () => {
            socket.off();
        }
    }, [messages])


    const logout = ()=>{
        localStorage.removeItem("user");
    }
  return (
    <div className="chatPage">
            <div className="chatContainer">
                <div className="header">
                    <h2>wassapp</h2>
                    <a href="/" onClick={logout}> <span>Logout</span> </a>
                </div>
                <ReactScrollToBottom className="chatBox">
                    {messages.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)}
                </ReactScrollToBottom>
                <div className="inputBox">
                    <input placeholder='Message' onKeyPress={(event) => event.key === 'Enter' ? send() : null} type="text" id="chatInput" />
                    <button onClick={send} className="sendBtn"><img src={sendLogo} alt="Send" /></button>
                </div>
            </div>

        </div>
  )
}

export default Chat