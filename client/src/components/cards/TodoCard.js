import React from "react";

const TodoCard = (props) => {
  const { todo } = props;
  let dt = new Date(todo.time);
  // dt.setTime(dt.getTime() - dt.getTimezoneOffset() * 60 * 1000); // to convert to UTC
  let arr = dt.toString().split(" ");
  let date = [];
  for(let i = 1; i < 5; i++){
    date.push(arr[i]);
  }
  date = date.join(" ");

  return (
    <>
      {todo.status === "completed" && <div className="indicateComplete"></div>}
      {todo.status === "pending" && <div className="indicatePending"></div>}
      {todo.status === "uncompleted" && (
        <div className="indicateUncomplete"></div>
      )}
      <div className="row ">
        <span className="col-6">
          <strong>Title: {todo.title}</strong>
        </span>
        <span className="col-6 text-end text-warning">
          <strong>{todo.priority}</strong>
        </span>
        <span className="col-2 mt-1">
          <strong>Description: </strong>
        </span>
        <p className="col-12 text-info">{todo.description}</p>
        <div className="col-12 text-warning">
          <span className="me-1">Date:</span>
          <span className="">{date}</span>
        </div>

        <span className="col-2 mt-2">
          <strong>Remarks:</strong>
        </span>
        <div className="w-100"></div>
        <span className="col-12 mb-1 text-info">{todo.remarks}</span>
      </div>
    </>
  );
};

export default TodoCard;
