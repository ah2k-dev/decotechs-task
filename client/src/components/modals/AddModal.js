import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { addTask, clearErrors, getTasks } from "../../actions/userActions";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const AddModal = (props) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { error, loading, tasks } = useSelector(
    (state) => state.user
  );
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("");
  const [time, setTime] = useState(new Date());
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };
  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };
  const btnAdd = () => {
    const task = {
      title,
      description: desc,
      priority,
      time,
    };
    dispatch(addTask(task, props.id));
    const timer = setTimeout(() => {
      dispatch(getTasks(props.id));
    }, 1000);
    props.handleClose();
    return () => clearTimeout(timer);
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (tasks) {
      if(tasks.message){
        alert.show(tasks.message);
      }
    }
  }, [error, dispatch, alert, tasks])
  
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Todo</Modal.Title>
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
            <div className="col-6 mt-2 d-flex align-items-center">
              <span className="me-4">Time:</span>
              <DatePicker
                className="w-100"
                selected={time}
                showTimeSelect
                onChange={(date) => setTime(date)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button id="btnModal" onClick={btnAdd}>
            Add
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddModal;
