import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      id: "",
      name: "",
      email: "",
    };

    this.state = this.initialState;
  }

  handleChange = (event) => {
    const { id, value } = event.target;

    this.setState({
      [id]: value,
    });
  };

  submitForm = () => {
    this.props.handleSubmit(this.state);
    this.setState(this.initialState);
  };

  render() {
    return (
      <form>
        <label>ID</label>
        <input
          type="text"
          id="id"
          value={this.state.id}
          onChange={this.handleChange}
        />
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <label>Email</label>
        <input
          type="text"
          email="email"
          value={this.state.email}
          onChange={this.handleChange}
        />

        <input type="button" value="Submit" onClick={this.submitForm} />
      </form>
    );
  }
}

export default Form;
