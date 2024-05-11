import { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { userService } from "../services/user.service";
import { LoginSignup } from "./LoginSignup";

export function AppHeader() {
  const [loggedinUser, setLoggedinUser] = useState(
    userService.getLoggedinUser()
  );

  async function onLogin(credentials) {
    console.log(credentials);
    try {
      const user = await userService.login(credentials);
      setLoggedinUser(user);
      showSuccessMsg(`Welcome ${user.fullname}`);
    } catch (err) {
      console.error("Cannot login :", err);
      showErrorMsg(`Cannot login`);
    }
  }

  async function onSignup(credentials) {
    console.log(credentials);
    try {
      const user = await userService.signup(credentials);
      setLoggedinUser(user);
      showSuccessMsg(`Welcome ${user.fullname}`);
    } catch (err) {
      console.error("Cannot signup :", err);
      showErrorMsg(`Cannot signup`);
    }
    // add signup
  }

  async function onLogout() {
    console.log("logout");
    try {
      await userService.logout();
      setLoggedinUser(null);
    } catch (err) {
      console.error("can not logout");
    }
    // add logout
  }
  return (
    <header className="app-header container">
      <div className="header-container">
        <section className="login-signup-container">
          {!loggedinUser && (
            <LoginSignup onLogin={onLogin} onSignup={onSignup} />
          )}

          {loggedinUser && (
            <div className="user-preview">
              <h3>
                Hello {loggedinUser.fullname}
                <button onClick={onLogout}>Logout</button>
              </h3>
            </div>
          )}
        </section>
        <nav className="app-nav">
          <NavLink to="/">Home</NavLink> |<NavLink to="/bug">Bugs</NavLink> |
          <NavLink to="/about">About</NavLink>
        </nav>
        <h1>Bugs are Forever</h1>
      </div>
    </header>
  );
}
