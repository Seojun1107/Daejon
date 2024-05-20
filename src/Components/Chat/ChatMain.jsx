// src/Chat.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.css"

const socket = io('http://localhost:3001');

function ChatMain(props) {

  const [partner, setPartner] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [channel, setChannel] = useState();

  useEffect(() => {
      socket.on('match', ({ partner }) => {
          setPartner(partner);
          console.log('Matched with: ', partner);
      });

      socket.on('message', ({ message }) => {
          setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
          socket.off('match');
          socket.off('message');
      };
  }, []);

  let ch1 = "ch1";
  let ch2 = "ch2";
  let i = 0;
  const sendMessage = () => {
    if (i % 2 === 0) {
        setChannel(ch1);
    }
    else {
        setChannel(ch2);
    }
    i = i + 1;
    socket.emit('message', { partner, message });
    setMessages((prevMessages) => [...prevMessages, message]);
    setMessage('');
  };
  return (
    <div className="center">
        <div className="wrap">
            {/* <div className="chat ch1">
                <div className="icon"><i className="fa-solid fa-user"></i></div>
                <div className="textbox">안녕하세요 저는 박서준입닙다1</div>
            </div>
            <div className="chat ch2">
                <div className="icon"><i className="fa-solid fa-user"></i></div>
                <div className="textbox">안녕하세요1 </div>
            </div> */}

            {messages.map((msg, index) => (
                <div className={`chat ${channel}`}>
                    <div className="icon"><i className="fa-solid fa-user"></i></div>
                    <div className="textbox" key={index}>{msg}</div>
                </div>
            ))}
        </div>
        <div className='send'>
            <input 
                type="text" 
                placeholder='메시지를 입력하세요'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>
                <FontAwesomeIcon icon={faPaperPlane} />
            </button>
        </div>
    </div>
  )
}

export default ChatMain