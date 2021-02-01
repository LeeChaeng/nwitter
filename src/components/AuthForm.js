import { authService } from "fbase";
import React, { useState } from "react";
import styled from "styled-components";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
    console.log(event.target.name);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    let data;
    if (newAccount) {
      //create account
      data = await authService.createUserWithEmailAndPassword(email, password);
    } else {
      //log in
      data = await authService.signInWithEmailAndPassword(email, password);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <>
      <Container onSubmit={onSubmit}>
        <AuthInput
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <AuthInput
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <AuthInput
          className="authSubmit"
          type="submit"
          value={newAccount ? "Create Account" : "Sign in"}
        />
      </Container>
      <AuthSwitch onClick={toggleAccount}>
        {newAccount ? "Sign in" : "Create Account"}
      </AuthSwitch>
    </>
  );
};

const Container = styled.form`
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  .authSubmit {
    text-align: center;
    background: #04aaff;
    color: white;
    margin-top: 10;
    cursor: pointer;
  }
`;

const AuthInput = styled.input`
  max-width: 320px;
  width: 100%;
  padding: 10px;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 1);
  margin-bottom: 10px;
  font-size: 12px;
  color: black;
`;

const AuthSwitch = styled.span`
  color: #04aaff;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 50px;
  display: block;
  font-size: 12px;
  text-decoration: underline;
`;

export default AuthForm;
