import React from "react";

const Nweet = ({ nweetObject, isOwner }) => {
  return (
    <div>
      <h4>{nweetObject.text}</h4>
      {isOwner && (
        <>
          <button>Delete Nweet</button>
          <button>Edit Nweet</button>
        </>
      )}
    </div>
  );
};

export default Nweet;
