const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      validatedEmail: "",
    },

    actions: {
      validate: async () => {
        try {
          const myToken = localStorage.getItem("jwt-token");

          const response = await fetch(
            process.env.BACKEND_URL + "/api/validate",
            {
              method: "GET",
              headers: {
                Authorization: "Bearer " + myToken,
                "Content-Type": "application/json",
              },
            }
          );
          const responseAsJson = await response?.json();

          if (responseAsJson) {
            setStore({
              validatedEmail: responseAsJson.email,
              password: password,
            });
          }
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },

      signUp: async (email, password, navigate) => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/signup",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: email,
				password: password,
				is_active: true
              }),
            }
          );

          const responseAsJson = await response.json();
          if (responseAsJson.msg == "New User Signed up...") {
            navigate("/login");
          }
        } catch (error) {
          console.error("error from signUp action",error);
        }
      },

      logout: (navigate) => {
        localStorage.removeItem("jwt-token");
        setStore({ validatedEmail: null });
        navigate("/login");
      },

      login: async (email, password, navigate) => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: email,
                password: password,
              }),
            }
          )
          const responseAsJson = await response.json();
          if (responseAsJson.token) {
            localStorage.setItem("jwt-token", responseAsJson.token);
            setStore({ validatedEmail: email });
            navigate("/");
          } else {
            alert("email or password are wrong");
          }
        } catch (error) {
          console.log("error");
          console.log(error);
        }
      },
    },
  };
};

export default getState;
