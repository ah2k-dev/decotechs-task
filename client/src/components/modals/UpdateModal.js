import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux/es/exports";
import {
  updateTask,
  getTasks,
  deleteTask,
} from "../../actions/userActions";
import Modal from "react-bootstrap/Modal";
const UpdateModal = (props) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [status, setStatus] = useState();
  const [priority, setPriority] = useState();
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };
  const handleStatusChange = (e) => {
    if (e.target.checked) {
      setStatus("completed");
    } else {
      setStatus("pending");
    }
  };
  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };
  const btnUpdate = () => {
    // console.log(title,desc,status,priority);
    const task = {
      title: title,
      description: desc,
      status: status,
      priority: priority,
    };
    dispatch(updateTask(task, props.todo._id));
    dispatch(getTasks(props.id));

    props.handleClose();
  };
  const btnDelete = () => {
    dispatch(deleteTask(props.todo._id));
    dispatch(getTasks(props.id));

    props.handleClose();
  };
  useEffect(() => {
    if (props.todo !== "") {
      setTitle(props.todo.title);
      setDesc(props.todo.description);
      setStatus(props.todo.status);
      setPriority(props.todo.priority);
    }
  }, [props.todo]);

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12 mb-2 form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                onChange={handleTitleChange}
                required
              />
              <label htmlFor="floatingInput" className="ms-2 text-dark">
                Title
              </label>
            </div>
            <div className="col-12">
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                placeholder="Description"
                onChange={handleDescChange}
                rows="3"
              ></textarea>
            </div>
            <div className="col-5 mt-2">
              <select
                class="form-select"
                aria-label="Default select example"
                onChange={handlePriorityChange}
                required
              >
                <option value="">Priority</option>
                <option value="high">High</option>
                <option value="normal">Normal</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="col-6 d-flex align-items-center justify-content-end">
              <span>Completed:</span>
              <input
                type="checkbox"
                className="mt-1 ms-5"
                onChange={handleStatusChange}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button id="btnModal" onClick={btnDelete}>
            Delete
          </button>
          <button id="btnModal" onClick={btnUpdate}>
            Update
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateModal;
