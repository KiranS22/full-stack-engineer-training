import React, { useEffect } from "react";
import Routing from "./Routing";
import "./app.css";
import { selectTheme } from "../../Redux/features/Slices/Toggler/Toggler";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logInUser } from "../../Redux/features/Slices/Auth/Auth";
import { selectToken } from "../../Redux/features/Slices/Auth/Auth";
function App() {
  const mode = useSelector(selectTheme);
  const token = useSelector(selectToken);
  axios.interceptors.request.use(
    (config) => {
      config.headers.authorisation = `Bearer ${token}`;
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  const getLoggedInUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/auth/auth-user`,
        {
          headers: {
            authorisation: `Bearer ${token}`,
          },
        }
      );

      console.log("Response:", response.data);
      if (response.data.status == "success") {
        const { user } = response.data;
        dispatch(logInUser(user));
      } else {
        console.log("something went wrong");
      }
    } catch (err) {
      console.log({ status: "Error", message: err.meesage });
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    // async thunks
    getLoggedInUser();
    //Send an Axios Request to the backend, and check if the user is authenticated. If Yes, then dispatch and loginUser.
  }, []);

  return (
    <>
      <div id={`body-bg-${mode}`}>
        <Routing />
      </div>
    </>
  );
}

export default App;
