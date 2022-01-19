import React, { Component } from "react";
import { Link } from "react-router-dom";

class RegisterForm extends Component {
  render() {
    return (
      <div>
        <form action="">
          <input type="text" placeholder="name" />
          <input type="email" placeholder="email" />
          <input type="number" placeholder="Number of children" />
          <select name="age-groups" id="" multiple>
            <option value="Please select" disabled>
              Please select age groups for your child
            </option>
            <option value="0-1">0-1 years old</option>
            <option value="1-2">1-2 years old</option>
            <option value="2-4">2-4 years old</option>
            <option value="4-8">4-8 years old</option>
            <option value="8-12">8-12 years old</option>
          </select>
          <input type="text" placeholder="Password" />
          <input type="text" placeholder="Confirm password" />
          <Link to="/sign-in">
            <button type="submit">Register</button>
          </Link>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
