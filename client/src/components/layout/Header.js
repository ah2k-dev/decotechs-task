import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/userActions";
const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const btnLogout = () => {
    localStorage.removeItem("jwt");
    dispatch(logout());
  };
  return (
    <div className="container-fluid">
      <div className="row border-bottom border-light mxH80">
        <div className="col-md-12 shadow p-2 pb-3 d-flex align-items-center justify-content-between">
          <span className="display-6 ms-4">
            <strong>Task Manager</strong>
          </span>
          {isAuthenticated ? (
            <button id="btnLogout" className="me-3" onClick={btnLogout}>
              <img src="/assets/logout.png" alt="logout" />
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
