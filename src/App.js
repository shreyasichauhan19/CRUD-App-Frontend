import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTest from "./components/add-test.component";
import Test from "./components/test.component";
import TestsList from "./components/tests-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/tests"} className="navbar-brand">
            JAME
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/tests"} className="nav-link">
                Tests
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<TestsList/>} />
            <Route path="/tests" element={<TestsList/>} />
            <Route path="/add" element={<AddTest/>} />
            <Route path="/tests/:id" element={<Test/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
