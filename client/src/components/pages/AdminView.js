import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getUsers, clearErrors, getTodos } from "../../actions/adminActions";
import TodoCard from "../cards/TodoCard";
import RemarksModal from "../modals/RemarksModal";
import Loader from "../layout/Loader";
const AdminView = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { error, loading, users, tasks } = useSelector((state) => state.admin);
  const [userArray, setUserArray] = useState([]);
  const [showRemarksModal, setShowRemarksModal] = useState(false);
  const [id, setId] = useState("");
  const [uId, setUId] = useState("");
  const createArr = () => {
    let arr = [];
    users.user.map((user) => {
      let obj = {
        id: user._id,
        name: `${user.firstName} ${user.lastName}`,
      };
      arr.push(obj);
    });
    setUserArray([...arr]);
  };
  const handleSelectUser = (e) => {
    dispatch(getTodos(e.target.value));
    setUId(e.target.value);
  };
  const renderRemarksModal = (id) => {
    setId(id);
    setShowRemarksModal(true);
  };
  const handleClosreRemarksModal = () => {
    setShowRemarksModal(false);
  };
  useEffect(() => {
    dispatch(getUsers());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  useEffect(() => {
    if (users) {
      createArr();
    }
  }, [users]);

  return (
    <div className="container page">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="row mt-3 align-items-center">
            <span className="col-5 col-md-3">Select User to view tasks:</span>
            <div className="col-7 col-md-8">
              <select
                class="form-select"
                aria-label="Default select example"
                onChange={handleSelectUser}
                required
              >
                {userArray.map((val, key) => {
                  return (
                    <option key={key} value={val.id}>
                      {val.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          {tasks &&
            (tasks.hasOwnProperty("todo") && tasks.todo.length > 0 ? (
              <>
                <div className="row mt-3 ms-3 me-3 justify-content-center todoCont">
                  {tasks.todo.map((todo, index) => {
                    return (
                      <div
                        className="col-8 col-md-3 border p-3 m-3 todo-item"
                        key={index}
                        onClick={() => renderRemarksModal(todo._id)}
                      >
                        <TodoCard todo={todo} />
                      </div>
                    );
                  })}
                </div>
                <RemarksModal
                  show={showRemarksModal}
                  handleClose={handleClosreRemarksModal}
                  id={id}
                  uid={uId}
                />
              </>
            ) : (
              <span className="mt-5 pt-5 ms-5">No Tasks Available</span>
            ))}
        </>
      )}
    </div>
  );
};

export default AdminView;
