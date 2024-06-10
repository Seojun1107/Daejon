import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
`;

const Form = styled.form`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 3em;
  padding-left: 2.8em;
  padding-right: 2.8em;
  padding-bottom: 2.1em;
  border-radius: 15px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15), 0 0 20px rgba(0, 0, 0, 0.1);
  transition: .4s ease-in-out;
  align-items: center;
`;


const Heading = styled.p`
  padding-left: 0.8em;
  color: black;
  background-color: transparent;
  letter-spacing: .5em;
  text-align: center;
  padding-top: 1em;
  padding-bottom: 3em;
  text-shadow: inset -1px -1px 1px #DAA06D;
`;

const Input = styled.input`
  outline: none;
  padding: 0.5em;
  border: 1px solid black;
  color: black;
  width: 14em;
  height: 3em;
  border-radius: 10px;
  background-color: white;
  text-align: center;
`;

const Btn = styled.button`
  align-self: center;
  margin-top: 2em;
  border-radius: 10px;
  outline: none;
  border: none;
  color: black;
  background-color: white;
  font-weight: bold;
  letter-spacing: 0.1em;
  transition: .4s ease-in-out opacity, .1s ease-in-out active;
  padding: 1em;
  box-shadow: 0.5px 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.5);
  &:hover {
    opacity: 0.8;
  }
  &:active {
    transform: translateX(0.1em) translateY(0.1em);
    box-shadow: none;
  }
  &::placeholder {
    color: #DAA06D;
    text-align: center;
  }
`;

const Login = (props) => {
  const [id, setId] = useState();
  const [pwd, setPwd] = useState();

  const handleChangeId = (e) => {
    setId(e.target.value)
  }
  const handleChangePwd = (e) => {
    setPwd(e.target.value)
  }

  const checkLogin = () => {
    if (id === "psm2301" && pwd === "ka120313") {
      props.setLogin(true)
    }
    else {
      props.etLogin(false)
      alert("아이디 또는 비밀번호가 일치하지 않습니다.")
    }
  }
  return (

    <Container>
      <Form className="form">
        <Heading className="heading">관리자 로그인</Heading>
        <Input placeholder="아이디" className="input" type="text" value={id} onChange={handleChangeId}/>
        <Input placeholder="비밀번호" className="input" type="password"value={pwd} onChange={handleChangePwd}/>
        <Btn className="btn" onClick={checkLogin} >로그인</Btn>
      </Form>
    </Container>
  );
};

export default Login;
