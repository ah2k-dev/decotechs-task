import React from 'react'
import { Link } from 'react-router-dom'
const _404 = () => {
  return (
    <div className="container-fluid page">
      <div className="container d-flex align-items-center">
        <div className="row mt-5 pt-5">
          <span className="col-12 display-2">404 Not Found</span>
          <span className="col-12 display-6">
            *Path you are trying to access is not avialable or you are
            unauthorized to visit.
          </span>
          <span className="col-2 ms-3 mt-5">
            <Link className="link" to="/">--Login</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default _404