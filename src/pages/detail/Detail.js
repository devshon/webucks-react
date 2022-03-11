import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router';
import Header from '../../components/header/Header';
import Review from '../../components/review/Review';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

import './Detail.scss';

function Detail() {
  const location = useLocation();
  const { item } = location.state;
  let likeData = JSON.parse(localStorage.getItem('likes'));
  let reviewData = JSON.parse(localStorage.getItem(item.id));
  const [isLike, setIsLike] = useState(likeData.includes(item.id));
  const [reviewList, setReviewList] = useState(!!reviewData ? reviewData : []);
  const reviewInputRef = useRef();
  const allergy =
    item.nourishment.allergy.length > 0 ? item.nourishment.allergy : '없음';

  function reviewInputKeyPress(e) {
    const { value } = e.target;
    const randomId = Math.floor(Math.random() * 1000000000);
    let reviewData = JSON.parse(localStorage.getItem(item.id));
    if (e.key === 'Enter' && value.trim() !== '') {
      if (!!reviewData) {
        reviewData.push({
          id: randomId,
          comment: value,
          isLike: false,
        });
        localStorage.setItem(item.id, JSON.stringify(reviewData));

        setReviewList(reviewData);
      } else {
        localStorage.setItem(
          item.id,
          JSON.stringify([{ id: randomId, comment: value, isLike: false }])
        );

        setReviewList([{ id: randomId, comment: value, isLike: false }]);
      }
      reviewInputRef.current.value = '';
    }
  }

  function heartBtnClick(bool) {
    let likeData = JSON.parse(localStorage.getItem('likes'));
    if (likeData.includes(item.id)) {
      likeData = likeData.filter(id => {
        if (id !== item.id) return id;
        else return null;
      });
    } else {
      likeData.push(item.id);
    }
    localStorage.setItem('likes', JSON.stringify(likeData));
    setIsLike(bool);
  }

  return (
    <>
      <Header />
      <main className="detail_main">
        <section className="left_container">
          <picture className="image_wrapper">
            <img alt={item.name} src={item.image} />
          </picture>
        </section>
        <section className="right_container">
          <header className="container_header">
            <h2>{item.name}</h2>
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
                color="black"
              />
            )}
          </header>
          <section className="summary_wrapper">
            <div dangerouslySetInnerHTML={{ __html: item.summary }} />
          </section>
          <section className="infomation_wrapper">
            <div className="infomation_header">
              <h3>제품 영양 정보</h3>
              <span>Tall(톨) / 355ml (12 fl oz)</span>
            </div>
            <div className="infomation_contents">
              <div className="infomation_box">
                <div>
                  <span>1회 제공량 (kcal)</span>
                  <span>{item.nourishment.kal}</span>
                </div>
                <div>
                  <span>포화지방 (g)</span>
                  <span>{item.nourishment.saturatedFat}</span>
                </div>
                <div>
                  <span>단백질 (g)</span>
                  <span>{item.nourishment.protein}</span>
                </div>
              </div>
              <div className="infomation_box">
                <div>
                  <span>나트륨 (mg)</span>
                  <span>{item.nourishment.sodium}</span>
                </div>
                <div>
                  <span>당류 (g)</span>
                  <span>{item.nourishment.sugar}</span>
                </div>
                <div>
                  <span>카페인 (mg)</span>
                  <span>{item.nourishment.caffeine}</span>
                </div>
              </div>
            </div>
            <div className="infomation_allergy">
              <span>알레르기 유발 요인 : {allergy}</span>
            </div>
          </section>
          <section className="review_container">
            <header className="review_header">
              <h2>리뷰</h2>
            </header>
            <div className="review_list">
              <ul>
                {reviewList.length > 0 &&
                  reviewList.map((review, idx) => {
                    return (
                      <Review
                        coffeeItem={item}
                        item={review}
                        index={idx}
                        setReviewList={setReviewList}
                        key={review.id}
                      />
                    );
                  })}
              </ul>
            </div>
            <input
              ref={reviewInputRef}
              className="review_input"
              placeholder="리뷰를 입력해주세요"
              onKeyPress={reviewInputKeyPress}
              type="text"
              maxLength="15"
            />
          </section>
        </section>
      </main>
    </>
  );
}

export default Detail;
