import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { giveRemark, getTodos } from "../../actions/adminActions";

const RemarksModal = (props) => {
  const dispatch = useDispatch();
  const [remarks, setRemarks] = useState("");
  const handleRemarksChange = (e) => {
    setRemarks(e.target.value);
  };
  const btnGive = () => {
    dispatch(giveRemark(remarks, props.id));
    const timer = setTimeout(() => {
      dispatch(getTodos(props.uid));
    }, 1000);
    props.handleClose();
    return () => clearTimeout(timer);
  };
  return (
    <Modal show={props.show} onHide={props.handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Give Remarks</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-12">
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              placeholder={`Remarks for the task: ${props.id}`}
              onChange={handleRemarksChange}
              rows="3"
            ></textarea>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button id="btnModal" onClick={btnGive}>
          Update
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemarksModal;
