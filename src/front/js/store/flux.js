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
          const resp = await fetch(`${process.env.BACKEND_URL}/api/signup`, {
            method: "POST",
            body: JSON.stringify({
              email: email,
              password: password,
              is_active: true,
            }),
          });
          const data = await resp.json();
          console.log("sign up successful");
          if (data) {
            navigate("/");
          }
        } catch (error) {
          console.error("error from signUp action", error);
        }
      },
    },
  };
};

export default getState;
