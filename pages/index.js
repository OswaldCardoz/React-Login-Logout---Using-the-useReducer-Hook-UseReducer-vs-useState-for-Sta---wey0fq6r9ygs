import React, { useReducer } from "react";

const reducer = (state, action) => {
  switch(action.type){
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "LOGIN":
      if (state.username && state.password) {
        return { ...state, loggedIn: true, error: false };
      } else {
        return { ...state, error: true };
      }
    case "LOGOUT":
      return { ...state, loggedIn: false, username: "", password: "" };
    default:
      return state;
  }
};

export default function Home() {
  const [state, dispatch] = useReducer(reducer, {
    username: "",
    password: "",
    loggedIn: false,
    error: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: `SET_${name.toUpperCase()}`, payload: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN" });
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div id="main">
      {state.loggedIn ? (
        <section className="logout-section">
          <h2>Logged in successfully!</h2>
          <p>Welcome {state.username}!</p>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </section>
      ) : (
        <form className="login-form">
          {state.error && (
            <p className="invalid-error">Invalid username or password!</p>
          )}
          <section className="username-input">
            <label>Username: </label>
            <input
              type="text"
              placeholder="Username"
              className="username"
              name="username"
              value={state.username}
              onChange={handleInputChange}
            />
          </section>
          <section className="password-input">
            <label>Password: </label>
            <input
              type="password"
              placeholder="Password"
              className="password"
              name="password"
              value={state.password}
              onChange={handleInputChange}
            />
          </section>
          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>
        </form>
      )}
    </div>
  );
}
