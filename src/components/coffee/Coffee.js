import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsHeart, BsHeartFill } from "react-icons/bs";

import "./Coffee.scss";

let likeData = JSON.parse(localStorage.getItem("likes"));

function Coffee(props) {
  const { item } = props;
  const navigate = useNavigate();

  const [isLike, setIsLike] = useState(likeData.includes(item.id));

  function heartBtnClick(bool) {
    let likeData = JSON.parse(localStorage.getItem("likes"));
    if (likeData.includes(item.id)) {
      likeData = likeData.filter((id) => {
        if (id !== item.id) return id;
        else return null;
      });
    } else {
      likeData.push(item.id);
    }
    localStorage.setItem("likes", JSON.stringify(likeData));
    setIsLike(bool);
  }

  return (
    <div className="coffee_main">
      {isLike ? (
        <BsHeartFill
          onClick={() => heartBtnClick(false)}
          className="icon icon_heart"
          color="red"
        />
      ) : (
        <BsHeart
          onClick={() => heartBtnClick(true)}
          className="icon icon_heart"
          color="white"
        />
      )}
      <picture
        className="image_wrapper"
        onClick={() => {
          navigate(`/detail/${item.id}`, { state: { item } });
        }}
      >
        <img alt={item.name} src={item.image} />
      </picture>
      <span className="coffee_name">{item.name}</span>
    </div>
  );
}

export default Coffee;
