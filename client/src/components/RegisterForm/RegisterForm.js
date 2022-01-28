import React from "react";
import logo from "../../assets/images/logo.PNG";

function RegisterForm(props) {
  return (
    <>
      <div className="home__logo-container">
        <img className="home__logo-img" src={logo} alt="" />
      </div>

      <div className="sign-in-form-container">
        <form
          className="sign-in-form"
          action=""
          onSubmit={props.handleRegisterSubmit}
        >
          <input
            className="sign-in-form__input"
            type="text"
            name="name"
            placeholder="name"
            required
          />
          <input
            className="sign-in-form__input"
            type="text"
            name="username"
            placeholder="username"
            required
          />
          <input
            className="sign-in-form__input"
            type="number"
            name="numberOfChildren"
            placeholder="Number of children"
            required
          />
          <input
            className="sign-in-form__input"
            type=""
            name="childrenAgeGroup"
            placeholder="Children age group"
            required
          />
          <input
            className="sign-in-form__input"
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <input
            className="sign-in-form__input"
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            required
          />

          <button className="sign-in-form__submit-btn" type="submit">
            Register
          </button>
        </form>
      </div>
    </>
  );
}

export default RegisterForm;
