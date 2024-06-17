import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store, actions } = useContext(Context);

  const navigate = useNavigate();

  useEffect(() => {
    actions.syncTokenFromSessionStorage(navigate);
  }, [actions, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (email === '' || password === '') {
        alert('Email or password should not be empty');
      }
      const data = await actions.login(email, password);
      if (data) {
        navigate("/")
      }  
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="container">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            <h1>Log In</h1>
            {store.token && store.token !== "" && store.token !== undefined ? (  
            console.log("you are logged in with the token " + store.token)
            ) : (
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
                  Log In
                </button>
              </div>
            </form>
            )}
          </div>
          <div className="col-2"></div>
        </div>
    </div>
  );
};
