import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.css"
import badWords from '../Utils/badWord.json'; // Make sure this path is correct
import Loading from './Loading';

function ChatMain(props) {
  const [partner, setPartner] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io('wss://ask.seojun.xyz');

    socket.current.on('connect', () => {
      socket.current.emit('readyForChat');
    });

    socket.current.on('match', ({ partner }) => {
      setPartner(partner);
      console.log('Matched with: ', partner);
    });

    socket.current.on('message', ({ message }) => {
      setMessages((prevMessages) => [...prevMessages, { text: message, sender: 'partner' }]);
      scrollToBottom(); // 새 메시지를 받을 때 스크롤을 아래로 이동
    });

    return () => {
      socket.current.off('match');
      socket.current.off('message');
      socket.current.disconnect();
    };
  }, []);

  
  const containsBadWords = (text) => {
    return badWords.some(badWord => text.toLowerCase().includes(badWord.toLowerCase()));
  };
  const sendMessage = () => {
    if (!message.trim()) return;
    if (containsBadWords(message)) {
      alert('비속어가 포함되어 있습니다. 메시지를 수정해 주세요.');
      return;
    }
    socket.current.emit('message', { partner, message });
    setMessages((prevMessages) => [...prevMessages, { text: message, sender: 'self' }]);
    setMessage('');
    scrollToBottom(); // 새 메시지를 보낼 때 스크롤을 아래로 이동
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  return (
    partner ? (
      <div className="center">
        <div ref={chatContainerRef} className="wrap">
          {messages.map((msg, index) => (
            <div key={index} className={`chat ${msg.sender === 'self' ? 'ch2' : 'ch1'}`}>
              <div className="icon"><i className="fa-solid fa-user"></i></div>
              <div className="textbox">{msg.text}</div>
            </div>
          ))}
        </div>
        <div className='send'>
          <input 
            type="text" 
            placeholder='메시지를 입력하세요'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleEnter} 
          />
          <button onClick={sendMessage}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    ) : (
      <div className='loadingWrap'>
        <div className='loading'>
          <Loading></Loading>
        </div>
      </div>
    )
  )
}

export default ChatMain;
