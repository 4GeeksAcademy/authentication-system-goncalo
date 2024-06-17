const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
    },

    actions: {
      syncTokenFromSessionStorage: async (navigate) => {
        const token = sessionStorage.getItem("token");
        if (token && token !== "" && token !== undefined) {
          setStore({ token: token });
          navigate("/");
        }
      },
      login: async (email, password) => {
        try {
          const resp = await fetch(`${process.env.BACKEND_URL}/api/token`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          });
          if (resp.ok) {
            const data = await resp.json();
            console.log("And the token is ", data);
            sessionStorage.setItem("token", data.access_token);
            setStore({ token: data.access_token });
            return data;
          } else {
            return false;
          }
        } catch (error) {
          console.log("Error fetching the Log In", error);
        }
      },
      logOut: () => {
        sessionStorage.removeItem("token");
        console.log("Loggin out");
        setStore({ token: null });
      },
      signUp: async (email, password, navigate) => {
        try {
          const resp = await fetch(`${process.env.BACKEND_URL}api/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
              is_active: true,
            }),
          });

          if (!resp.ok) {
            throw new Error("Failed to sign up");
          }

          const data = await resp.json();
          console.log("Sign up successful", data);
          navigate("/"); // Redirect to homepage after successful signup
        } catch (error) {
          console.error("Error from signUp action", error);
          // Handle error, possibly show a message to the user
        }
      },
    },
  };
};

export default getState;
