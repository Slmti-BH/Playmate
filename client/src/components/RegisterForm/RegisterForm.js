import React, { Component } from "react";

class RegisterForm extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <form action="" onSubmit={this.props.handleRegisterSubmit}>
          <input type="text" name="name" placeholder="name" required />
          <input type="text" name="username" placeholder="username" required />
          <input
            type="number"
            name="numberOfChildren"
            placeholder="Number of children"
            required
          />
          <input
            type=""
            name="childrenAgeGroup"
            placeholder="Children age group"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            required
          />

          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
