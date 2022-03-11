import React, { useState } from 'react';
import { BsHeart, BsHeartFill, BsTrash } from 'react-icons/bs';

import './Review.scss';

function Review(props) {
  const { coffeeItem, item, index, setReviewList } = props;
  const [isLike, setIsLike] = useState(item.isLike);

  function reviewLikeClick() {
    let reviewData = JSON.parse(localStorage.getItem(coffeeItem.id));

    const result = reviewData.map(review => {
      return {
        ...review,
        isLike: item.id === review.id ? !review.isLike : review.isLike,
      };
    });
    localStorage.setItem(coffeeItem.id, JSON.stringify(result));
    setIsLike(!isLike);
  }

  function reviewRemove() {
    let reviewData = JSON.parse(localStorage.getItem(coffeeItem.id));

    const result = reviewData.filter(review => {
      return review.id !== item.id;
    });

    localStorage.setItem(coffeeItem.id, JSON.stringify(result));

    setReviewList(result);
  }
  return (
    <li key={item.id}>
      <span>unknown{index + 1}</span>
      <span>{item.comment}</span>
      <span>
        {isLike ? (
          <BsHeartFill
            onClick={reviewLikeClick}
            className="icon icon_heart"
            color="red"
          />
        ) : (
          <BsHeart
            onClick={reviewLikeClick}
            className="icon icon_heart"
            color="black"
          />
        )}
        <BsTrash onClick={reviewRemove} />
      </span>
    </li>
  );
}

export default Review;
