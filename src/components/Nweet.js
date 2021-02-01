import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import styled from "styled-components";

const Nweet = ({ nweetObject, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObject.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    console.log(ok);
    if (ok) {
      await dbService.doc(`nweets/${nweetObject.id}`).delete();
      await storageService.refFromURL(nweetObject.attachmentURL).delete();
    }
  };
  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`nweets/${nweetObject.id}`).update({
      text: newNweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };
  return (
    <NweetContainer>
      {editing ? (
        <>
          <NweetForm onSubmit={onSubmit} className="nweetEdit">
            <input
              type="text"
              placeholder="edit your nweet"
              value={newNweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Nweet!" className="formBtn" />
          </NweetForm>
          <span onClick={toggleEditing} className="formBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{nweetObject.text}</h4>
          {nweetObject.attachmentURL && (
            <img src={nweetObject.attachmentURL} alt="nweet_img" />
          )}
          {isOwner && (
            <NweetAction>
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </NweetAction>
          )}{" "}
        </>
      )}
    </NweetContainer>
  );
};

const NweetContainer = styled.div`
  margin-bottom: 20px;
  background-color: white;
  width: 100%;
  max-width: 320px;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  color: rgba(0, 0, 0, 0.8);
  .nweetEdit .formBtn {
    cursor: pointer;
    margin-top: 15px;
    margin-bottom: 5px;
  }

  .formBtn {
    cursor: pointer;
    width: 100%;
    padding: 7px 20px;
    text-align: center;
    color: white;
    border-radius: 20px;
    background-color: #04aaff;
    cursor: pointer;
  }

  h4 {
    font-size: 14px;
  }
  img {
    right: -10px;
    top: 20px;
    position: absolute;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-top: 10px;
  }
`;

const NweetForm = styled.form`
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
`;

const NweetAction = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;

  span {
    cursor: pointer;
  }

  span:first-child {
    margin-right: 10px;
  }
`;

export default Nweet;
