import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { login, clearErrors } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/Loader";

const Login = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const btnLogin = () => {
    const user = {
      email: username,
      password,
    };
    dispatch(login(user));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      alert.show("Logged in");
    }
    if (user) {
      localStorage.setItem("jwt", user.token);
      if (user.user) {
        if (user.user.role === "admin") {
          const timer = setTimeout(() => {
            navigate("/admin");
          }, 1000);
          return () => {
            clearTimeout(timer);
          };
        }
        if (user.user.role === "user") {
          const timer = setTimeout(() => {
            navigate("/user-tasks");
          }, 1000);
          return () => {
            clearTimeout(timer);
          };
        }
      }
    }
  }, [dispatch, error, isAuthenticated, user, alert, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container page">
          <div className="row justify-content-center">
            <div className="col-md-12 d-flex justify-content-center ms-4 mb-3 mt-5 pt-5">
              <div className="row flex-column">
                <div className="col-md-9 mb-1">
                  <img
                    src="/assets/login.png"
                    alt="login"
                    className="img-fluid"
                  />
                </div>
                <span className="col-md-4 display-6 text-center">Login</span>
              </div>
            </div>
            <div className="col-8 col-md-4 mb-2 form-floating">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                onChange={handleUsernameChange}
                required
              />
              <label htmlFor="floatingInput" className="ms-2 text-dark">
                Email
              </label>
            </div>
            <div className="w-100"></div>
            <div className="col-8 col-md-4 mb-2 form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingInput"
                onChange={handlePasswordChange}
                required
              />
              <label htmlFor="floatingInput" className="ms-2 text-dark">
                Password
              </label>
            </div>
            <div className="w-100"></div>
            <button id="btnLogin" className="col-4 col-md-2" onClick={btnLogin}>
              Login
            </button>
            <div className="w-100"></div>
            <span className="col-6 col-md-4 text-center">
              <a href="/register">Don't have account? Register!</a>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
