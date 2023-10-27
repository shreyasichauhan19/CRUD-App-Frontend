import React, { Component } from "react";
import TestDataService from "../services/test.service";
import { Link } from "react-router-dom";

export default class TestsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTests = this.retrieveTests.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTest = this.setActiveTest.bind(this);
    this.removeAllTests = this.removeAllTests.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      tests: [],
      currentTest: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveTests();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveTests() {
    TestDataService.getAll()
      .then(response => {
        this.setState({
          tests: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTests();
    this.setState({
      currentTest: null,
      currentIndex: -1
    });
  }

  setActiveTest(test, index) {
    this.setState({
      currentTest: test,
      currentIndex: index
    });
  }

  removeAllTests() {
    TestDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentTest: null,
      currentIndex: -1
    });

    TestDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          tests: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, tests, currentTest, currentIndex } = this.state;

    const filteredTests = tests.filter(test => {
      return test.title.toLowerCase().includes(searchTitle.toLowerCase());
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="text-left">
              <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by title"
                value={searchTitle}
                onChange={this.onChangeSearchTitle}
              />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
        <div className="col-md-6 offset-md-3">
            <h4 className="text-center">Test Jobs List</h4>

          {filteredTests.length > 0 ? (
          <ul className="list-group">
            {filteredTests.map((test, index) => (
              <li
                className={
                  "list-group-item " +
                  (index === currentIndex ? "active" : "")
                }
                onClick={() => this.setActiveTest(test, index)}
                key={index}
              >
                {test.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">No items found</p>
          )}


          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTests}
          >
                 Remove All
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 offset-md-3">
          {currentTest ? (
            <div>
              <h4>Test</h4>
              <div>
                <label>
                  <h4>Job Title:</h4>
                </label>{" "}
                {currentTest.title}
              </div>
              <div>
                <label>
                  <strong> Job Description:</strong>
                </label>{" "}
                {currentTest.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentTest.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/tests/" + currentTest.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Job...</p>
            </div>
          )}
        </div>
      </div>
      </div>
    );
  }
}
