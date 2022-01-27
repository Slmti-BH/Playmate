import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Homepage from "./pages/HomePage/Homepage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import SignInForm from "./components/SignInForm/SignInForm";
import axios from "axios";

const baseUrl = "http://localhost:8080/auth";
const loginUrl = `${baseUrl}/sign-in`;
const signupUrl = `${baseUrl}/register`;

class App extends Component {
  state = {
    isSignedUp: false,
    isLoggedIn: false,
    isLoginError: false,
    errorMessage: "",
  };

  signIn = (e) => {
    e.preventDefault();
    console.log(e);
    axios
      .post(loginUrl, {
        username: e.target.username.value,
        password: e.target.password.value,
      })
      .then((response) => {
        console.log(response);
        this.setState(
          {
            isLoggedIn: true,
          },
          () => {
            document.location.href = "/profile";
          }
        );
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("notes", "");
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoginError: true, errorMessage: err });
      });

    e.target.reset();
  };

  register = (e) => {
    e.preventDefault();
    console.log(e);
    const {
      name,
      username,
      password,
      confirmPassword,
      numberOfChildren,
      childrenAgeGroup,
    } = e.target;

    // const checkPassword = (password, confirmPassword) => {
    //   if (password.value === confirmPassword.value) {
    //     return password;
    //   } else {
    //     return alert("Make sure that password and confirm password match.");
    //   }
    // };

    // checkPassword(password, confirmPassword);
    // console.log(name);

    // console.log(email.value);
    // console.log(password.value);
    // console.log(confirmPassword.value);
    // console.log(numberOfChildren.value);
    console.log(childrenAgeGroup.value);

    password.value === confirmPassword.value
      ? axios
          .post(signupUrl, {
            username: username.value,
            password: password.value,
            name: name.value,
            numberOfChildren: numberOfChildren.value,
            childrenAgeGroup: childrenAgeGroup.value,
          })
          .then((response) => {
            console.log(response);
            this.setState(
              {
                isSignedUp: true,
              },
              () => {
                document.location.href = "/sign-in";
              }
            );
          })
          .catch((err) => {
            console.log(err);
            this.setState({ isLoginError: true, errorMessage: err });
            alert(err);
          })
      : alert("Make sure password and confirm password match.");
  };

  signOut = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    document.location.href = "/";
  };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            render={(routerprops) => (
              <Homepage state={this.state} {...routerprops} />
            )}
          />
          <Route
            path="/sign-in"
            render={(routerprops) => (
              <SignInForm
                handleSignInSubmit={this.signIn}
                state={this.state}
                {...routerprops}
              />
            )}
          />
          <Route
            path="/register"
            render={(routerprops) => (
              <RegisterForm
                handleRegisterSubmit={this.register}
                state={this.state}
                {...routerprops}
              />
            )}
          />
          <Route
            path="/profile"
            render={(routerprops) => (
              <ProfilePage
                handleSignOut={this.signOut}
                state={this.state}
                {...routerprops}
              />
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

// function App() {
//   return (
//     <BrowserRouter>
//       <Switch>
//         <Route path="/" exact component={Homepage} />
//         <Route path="/sign-in" component={SignInForm} />
//         <Route path="/register" component={RegisterForm} />
//         <Route path="/profile" component={ProfilePage} />
//       </Switch>
//     </BrowserRouter>
//   );
// }

// export default App;
