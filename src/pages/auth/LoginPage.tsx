import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faKey } from "@fortawesome/free-solid-svg-icons";

import "@/styles/LoginPage.scss";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showLoginIcon, setShowLoginIcon] = useState(true);
  const [showPasswordIcon, setShowPasswordIcon] = useState(true);
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");

  const handleUserNameChange = (event) => {
    setUserName(event.target.value.trim());
  };

  const handlePasswordChange = (event) => {
    setPassWord(event.target.value.trim());
  };
  const togglePasswordVisibility = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/home");
    // localStorage.setItem("token", userName);
  };

  return (
    <div className="box section">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="square" style={{ "--i": index }}></div>
      ))}
      <div className="container">
        <div className="form">
          <h2>LOGIN to CodePen</h2>
          <form action="">
            <div className="inputBx">
              <input
                value={userName}
                type="text"
                required
                onFocus={() => {
                  setShowLoginIcon(false);
                }}
                onBlur={() => {
                  setShowLoginIcon(true);
                }}
                onChange={handleUserNameChange}
              />

              {showLoginIcon && !userName && <span>Login</span>}
              <i className="fas">
                <FontAwesomeIcon icon={faUserCircle} />
              </i>
            </div>
            <div className="inputBx password">
              <input
                value={passWord}
                id="password-input"
                type={showPassword ? "text" : "password"}
                name="password"
                required
                onChange={handlePasswordChange}
                onFocus={() => {
                  setShowPasswordIcon(false);
                }}
                onBlur={() => {
                  setShowPasswordIcon(true);
                }}
              />
              {showPasswordIcon && !passWord && <span>Password</span>}
              <a
                href="#"
                onClick={togglePasswordVisibility}
                className="password-control"
              ></a>
              <i className="fas">
                <FontAwesomeIcon icon={faKey} />
              </i>
            </div>
            <label className="remember">
              <input type="checkbox" />
              <i>Remember</i>
            </label>
            <div className="inputBx">
              <input
                type="submit"
                value="Log in"
                disabled={!(userName && passWord)}
                onClick={handleSubmit}
              />
            </div>
          </form>
          <div className="myp">
            <Link to="">Forgot password? Click Here</Link>
            <br />
            <Link to="">Don't have an account? Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
