// ChatMain.jsx

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { createNickName } from '../Utils/randomNick'; // 랜덤 이름 생성 함수 import

const ChatMain = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [username, setUsername] = useState(createNickName()); // 랜덤 사용자 이름 생성
  
  const socket = io('https://ask.seojun.xyz', {
    transports: ['websocket'],
    secure: true, // 보안 연결 사용 설정

  });

  useEffect(() => {

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  });

  const sendMessage = () => {
    if (inputMessage.trim() !== '') {
      socket.emit('message', { username, text: inputMessage }); // 사용자 이름과 메시지 전송
      setInputMessage('');
    }
  };

  return (
    <div>
        <div>
          <h1>ChatMain Component</h1>
          <div>
            {messages.map((msg, index) => (
              <div key={index} style={{ color: msg.fromMe ? 'blue' : 'black' }}>
                {msg.text}
              </div>
            ))}
          </div>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
    </div>
  );
};

export default ChatMain;
