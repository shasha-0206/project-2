import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Brand Link */}
          <Link className="navbar-brand" to="/">SVS</Link>

          {/* Navigation Links */}
          <div className="navbar-nav d-flex flex-row">
            <Link className="nav-link active mx-3" aria-current="page" to="/">Home</Link>
            <Link className="nav-link mx-3" to="/All-Files">All Files</Link>
          </div>
        </div>
      </nav>

      {/* Outlet where child components will render */}
      <Outlet />
    </>
  );
}

export default Navbar;
