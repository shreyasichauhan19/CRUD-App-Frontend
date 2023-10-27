import React, { Component } from "react";
import TestDataService from "../services/test.service";
import { withRouter } from '../common/with-router';

class Test extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getTest = this.getTest.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateTest = this.updateTest.bind(this);
    this.deleteTest = this.deleteTest.bind(this);

    this.state = {
      currentTest: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getTest(this.props.router.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTest: {
          ...prevState.currentTest,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentTest: {
        ...prevState.currentTest,
        description: description
      }
    }));
  }

  getTest(id) {
    TestDataService.get(id)
      .then(response => {
        this.setState({
          currentTest: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentTest.id,
      title: this.state.currentTest.title,
      description: this.state.currentTest.description,
      published: status
    };

    TestDataService.update(this.state.currentTest.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentTest: {
            ...prevState.currentTest,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTest() {
    TestDataService.update(
      this.state.currentTest.id,
      this.state.currentTest
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The test was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTest() {    
    TestDataService.delete(this.state.currentTest.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/tests');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTest } = this.state;

    return (
      <div className="container">
        {currentTest ? (
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Test</h4>
              <form>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={currentTest.title}
                    onChange={this.onChangeTitle}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    value={currentTest.description}
                    onChange={this.onChangeDescription}
                  />
                </div>
                <div className="form-group">
                  <label><strong>Status:</strong></label>
                  {currentTest.published ? "Published" : "Pending"}
                </div>
              </form>
              {currentTest.published ? (
                <button
                  className="btn btn-warning mr-2"
                  onClick={() => this.updatePublished(false)}
                >
                  UnPublish
                </button>
              ) : (
                <button
                  className="btn btn-success mr-2"
                  onClick={() => this.updatePublished(true)}
                >
                  Publish
                </button>
              )}
              <button
                className="btn btn-danger mr-2"
                onClick={this.deleteTest}
              >
                Delete
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.updateTest}
              >
                Update
              </button>
              <p className="mt-3">{this.state.message}</p>
            </div>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Test...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Test);
