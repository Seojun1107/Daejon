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
  const [lastMessageTime, setLastMessageTime] = useState(null);
  const [messageCount, setMessageCount] = useState(0);
  const [warningCount, setWarningCount] = useState(0);
  const chatContainerRef = useRef(null);
  const socket = useRef(null);

  const initialInterval = 5000; // 초기 시간 간격 (밀리초) - 5초
  const maxMessages = 5; // 최대 메시지 수 - 5개

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

  const getBlockingTime = () => {
    switch (warningCount) {
      case 1:
        return 10000; // 10초
      case 2:
        return 30000; // 30초
      case 3:
      default:
        return 60000; // 1분
    }
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    if (containsBadWords(message)) {
      alert('비속어가 포함되어 있습니다. 메시지를 수정해 주세요.');
      return;
    }

    const now = Date.now();
    const interval = getBlockingTime();

    if (lastMessageTime && (now - lastMessageTime) < interval && messageCount >= maxMessages) {
      alert(`너무 많은 메시지를 보냈습니다. 잠시 후 다시 시도하세요. 대기 시간: ${interval / 1000}초`);
      if ((now - lastMessageTime) < interval) {
        setWarningCount(prevCount => prevCount + 1);
      }
      return;
    }

    if (!lastMessageTime || (now - lastMessageTime) >= interval) {
      setLastMessageTime(now);
      setMessageCount(1);
      setWarningCount(0); // 시간이 지난 경우 경고 횟수 초기화
    } else {
      setMessageCount(prevCount => prevCount + 1);
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
