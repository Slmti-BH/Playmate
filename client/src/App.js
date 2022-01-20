import { BrowserRouter, Switch, Route } from "react-router-dom";
import Homepage from "./pages/HomePage/Homepage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import SignInForm from "./components/SignInForm/SignInForm";

import React, { Component } from "react";

class App extends Component {
  state = {
    isSignedUp: false,
    isLoggedIn: false,
    isLoginError: false,
    errorMessage: "",
  };

  signIn = (e) => {
    e.preventDefault();
    // console.log(e);
    // axios
    //   .post(loginUrl, {
    //     username: e.target.username.value,
    //     password: e.target.password.value,
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     this.setState({
    //       isLoggedIn: true,
    //     });
    //     sessionStorage.setItem('token', response.data.token);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     this.setState({ isLoginError: true, errorMessage: err });
    //   });
  };

  register = (e) => {
    e.preventDefault();
    // axios
    //   .post(signupUrl, {
    //     name: e.target.name.value,
    //     username: e.target.username.value,
    //     password: e.target.password.value,
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     this.setState({
    //       isSignedUp: true,
    //     });
    //   })
    //   .catch((err) => console.log(err));
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
              <RegisterForm  handleRegisterSubmit ={this.register} state={this.state} {...routerprops} />
            )}
          />
          <Route
            path="/profile"
            render={(routerprops) => (
              <ProfilePage state={this.state} {...routerprops} />
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
