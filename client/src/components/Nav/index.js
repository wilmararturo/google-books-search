import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Nav() {
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", updateWidth());
    return () => {
      window.removeEventListener("resize", updateWidth());
    };
  }, []);

  const updateWidth = () => {
    if (open && width > 991) {
      setOpen(false);
    }
    setWidth(window.innerWidth);
  };

  const toggleNav = () => {
    setOpen(!open);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark mb-2">
      <Link className="navbar-brand" to="/">
        My Google Books
      </Link>
      <button
        onClick={toggleNav}
        className="navbar-toggler"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div
        className={`${open ? "" : "collapse "}navbar-collapse`}
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              onClick={toggleNav}
              className={
                window.location.pathname === "/"
                  ? "nav-link active"
                  : "nav-link"
              }
              to="/"
            >
              Search
            </Link>
          </li>
          <li className="nav-item">
            <Link
              onClick={toggleNav}
              className={
                window.location.pathname === "/saved"
                  ? "nav-link active"
                  : "nav-link"
              }
              to="/saved"
            >
              Saved
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
