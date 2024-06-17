import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
	if (store.token === null) {
		actions.syncTokenFromSessionStorage(navigate);
	}
}, [store.token, actions, navigate]);

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>
        <div className="ml-auto">
          {!store.token ? (
            <>
              <Link to="/login" className="m-2">
                <button className="btn btn-primary">Log In</button>
              </Link>
              <Link to="/signup">
                <button className="btn btn-primary">Sign Up</button>
              </Link>
            </>
          ) : (
            
              <button className="btn btn-primary m-2" onClick={()=>actions.logOut()}>Log Out</button>
            
          )}
        </div>
      </div>
    </nav>
  );
};
