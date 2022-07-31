import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { register, clearErrors } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/Loader";
const Register = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const btnRegister = () => {
    const user = {
      email: username,
      password,
      firstName,
      lastName,
    };
    dispatch(register(user));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      alert.error("You are already registered");
    }
    if (user) {
      if (user.success === true) {
        alert.success("You are registered");
        navigate("/");
      }
    }
  }, [error, isAuthenticated, alert, dispatch, user]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container page">
          <div className="row justify-content-center">
            <div className="col-md-12 d-flex justify-content-center ms-4 mb-3 mt-5">
              <div className="row flex-column">
                <div className="col-md-9 mb-1">
                  <img
                    src="/assets/login.png"
                    alt="login"
                    className="img-fluid"
                  />
                </div>
                <span className="col-md-4 display-6 text-center me-4">
                  Register
                </span>
              </div>
            </div>
            <div className="col-8 col-md-4 mb-2 form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                onChange={handleFirstNameChange}
                required
              />
              <label htmlFor="floatingInput" className="ms-2 text-dark">
                First Name
              </label>
            </div>

            <div className="col-8 col-md-4 mb-2 form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                onChange={handleLastNameChange}
                required
              />
              <label htmlFor="floatingInput" className="ms-2 text-dark">
                Last Name
              </label>
            </div>
            <div className="w-100"></div>

            <div className="col-8 col-md-6 mb-2 form-floating">
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
            <div className="col-8 col-md-6 mb-2 form-floating">
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
            <button
              id="btnLogin"
              className="col-4 col-md-2"
              onClick={btnRegister}
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
