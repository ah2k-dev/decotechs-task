import React, { useState, useEffect } from "react";
import TodoCard from "../cards/TodoCard";
import AddModal from "../modals/AddModal";
import UpdateModal from "../modals/UpdateModal";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { getTasks, clearErrors } from "../../actions/userActions";
import Loader from "../layout/Loader";

const UserView = () => {
  const Navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const {_id} = useSelector((state) => state.user.user.user);
  const {role} = useSelector((state) => state.user.user);
  const { error, loading, tasks } = useSelector((state) => state.user);
  const [todo, setTodo] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const renderUpdateModal = (todo) => {
    setTodo(todo);
    setShowUpdateModal(true);
  };
  const renderAddModal = () => {
    setShowAddModal(true);
  };
  const handleCloseUpdate = () => {
    setShowUpdateModal(false);
    setTodo("");
  };
  const handleCloseAdd = () => {
    setShowAddModal(false);
  };
  useEffect(() => {
    dispatch(getTasks(_id));
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if(role !== 'user'){
      Navigate('/_404');
    }
  }, [dispatch, alert, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container-fluid page">
          <div className="row mt-3 ms-2 me-2 pb-2 justify-content-between border-bottom border-light">
            <span className="col-6 col-md-4 display-6">Todos</span>
            <button
              className="col-4 col-md-2"
              id="btnLogin"
              onClick={renderAddModal}
            >
              + Add Todo
            </button>
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
                        onClick={() => renderUpdateModal(todo)}
                      >
                        <TodoCard todo={todo} />
                      </div>
                    );
                  })}
                </div>
                <UpdateModal
                  show={showUpdateModal}
                  todo={todo}
                  id={_id}
                  handleClose={handleCloseUpdate}
                />
              </>
            ) : (
              <>No Tasks Available</>
            ))}

          <AddModal show={showAddModal} handleClose={handleCloseAdd} id={_id} />
        </div>
      )}
    </>
  );
};

export default UserView;
