import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { store, actions } = useContext(Context);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await actions.signUp(email, password, navigate);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <h1>Sign Up</h1>
          <form className="mt-2" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="staticEmail">Email address</label>
              <input
                type="email"
                className="form-control"
                id="staticEmail"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword">Password</label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Sign up
              </button>
            </div>
          </form>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
};
