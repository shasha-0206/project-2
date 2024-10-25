import React from 'react';
import { Outlet, Link } from 'react-router-dom'; // Import Link

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-md bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">SVS</Link>

          <button style={{width:'70px'}} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              {/* Replace href with Link and use the "to" attribute */}
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              <Link className="nav-link" to="/All-Files">All Files</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Outlet where child components will render */}
      <Outlet />
    </>
  );
}

export default Navbar;
