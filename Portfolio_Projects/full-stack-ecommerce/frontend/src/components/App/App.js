import ApplicationRoutes from "./Routing/Routing";
import React, { useEffect } from "react";
import { fetchAllProducts } from "../../Redux/features/Slices/Products/Products";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../../Resources/CSS/app.css";
import axios from "axios";
import { logInUser } from "../../Redux/features/Slices/Auth/Auth";
import { fetchAllCartItems } from "../../Redux/features/Slices/Cart/Cart";
import {
  fetchUserOrders,
  selectFilteredOrders,
  selectAllOrders,
} from "../../Redux/features/Slices/Orders/orders";
const App = () => {
  const getLoggedInUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/auth/auth-user`,
        {
          withCredentials: true,
        }
      );
      console.log("Response:", response.data);
      if (response.data.status == "success") {
        const { user } = response.data;
        console.log('user in app.js:',user);
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
    dispatch(fetchAllCartItems());
    dispatch(fetchAllProducts());
    dispatch(fetchUserOrders());
    //Send an Axios Request to the backend, and check if the user is authenticated. If Yes, then dispatch and loginUser.
  }, []);

  return (
    <>
      <ApplicationRoutes />
    </>
  );
};

export default App;
