import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Login.scss";

const regId = /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
const regPw = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

function _Login() {
  const navigate = useNavigate();
  const [idText, setIdText] = useState("");
  const [pwText, setPwText] = useState("");
  const [isShowPw, setIsShowPw] = useState(false);
  const isActiveId = regId.test(idText);
  const isActivePw = regPw.test(pwText);
  const isAbleLogin = isActiveId && isActivePw;

  function handleKeyPress(e) {
    if (e.key === "Enter" && isAbleLogin) {
      handleLoginBtn();
    }
  }

  function handleLoginBtn() {
    navigate("/list", { state: { username: idText } });
    // const params = JSON.stringify({
    //   email: idText,
    //   password: pwText,
    // });
    // const headers = {
    //   'Content-Type': 'application/json',
    //   Accept: '*/*',
    // };
    // axios.post('/users/login', params, { headers }).then(response => {
    //   if (response.statusText === 'OK') {
    //     localStorage.setItem('webucks_token', response.data.token);
    //     navigate('/list', { state: { username: idText } });
    //   } else {
    //     alert('아이디 비밀번호를 재확인 해주세요');
    //   }
    // });
  }
  return (
    <section className="login_main">
      <article>
        <header>
          <img alt="webucks" src="images/icon_webucks.png" />
        </header>
        <div className="input_container">
          <input
            id="login_id"
            className={isActiveId ? "active_input" : ""}
            type="text"
            maxLength="20"
            placeholder="전화번호, 사용자 이름 또는 이메일"
            onKeyPress={handleKeyPress}
            onChange={(e) => setIdText(e.target.value)}
          />
          <div className="login_password_wrap">
            <input
              id="login_pw"
              className={isActivePw ? "active_input" : ""}
              type={isShowPw ? "text" : "password"}
              maxLength="20"
              placeholder="비밀번호"
              onKeyPress={handleKeyPress}
              onChange={(e) => setPwText(e.target.value)}
            />
            <span onClick={() => setIsShowPw(!isShowPw)} id="show_button">
              {isShowPw ? "hide" : "show"}
            </span>
          </div>
          <button
            type="button"
            className={isAbleLogin ? "active_btn" : ""}
            onClick={handleLoginBtn}
            disabled={!isAbleLogin}
          >
            로그인
          </button>
        </div>
        <footer>
          <Link to="/signup">회원가입 하러가기</Link>
        </footer>
      </article>
    </section>
  );
}

export default _Login;
