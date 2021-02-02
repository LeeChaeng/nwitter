import React, { useState, useEffect } from "react";
import { authService, dbService } from "fbase";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

export default ({ userObj, refreshUser }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const getMyNweets = async () => {
    const nweets = await dbService
      .collection("nweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({ displayName: newDisplayName });
      refreshUser();
    }
  };

  return (
    <Container>
      <form onSubmit={onSubmit} className="profileForm">
        <FormInput
          onChange={onChange}
          type="text"
          autoFocus
          placeholder="Display Name"
          value={newDisplayName}
        />
        <FormBtn type="submit" value="Update Profile" />
      </form>
      <LogOut onClick={onLogOutClick}>Log Out</LogOut>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  .profileForm {
    border-bottom: 1px solid rgba(255, 255, 255, 0.9);
    padding-bottom: 30px;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px 20px;
  border-radius: 20px;
  border: 1px solid black;
  text-align: center;
  background-color: white;
  color: black;
  box-sizing: border-box;
`;

const FormBtn = styled.input`
  margin-top: 10px;
  cursor: pointer;
  width: 100%;
  padding: 7px 20px;
  text-align: center;
  color: white;
  border-radius: 20px;
  background-color: #04aaff;
  cursor: pointer;
`;

const LogOut = styled.span`
  width: 100%;
  padding: 7px 20px;
  text-align: center;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  margin-top: 50px;
  margin-bottom: 5px;
  background-color: tomato;
`;
