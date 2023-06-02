import ApplicationRoutes from "./Routing/Routing";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../../Resources/CSS/app.css";
import axios from "axios";
import { logInUser } from "../../Redux/features/Slices/Auth/Auth";
import { selectCartIsLoading } from "../../Redux/features/Slices/Cart/Cart";
import { selectOrdersIsLoading } from "../../Redux/features/Slices/Orders/orders";
import { selectProductsIsLoading } from "../../Redux/features/Slices/Products/Products";
import { useSelector } from "react-redux";
import { fetchAllCartItems } from "../../Redux/features/Slices/Cart/Cart";
const App = () => {
  const loadingProducts = useSelector(selectProductsIsLoading);
  const loadingOrders = useSelector(selectOrdersIsLoading);
  const loadingCart = useSelector(selectCartIsLoading);
  const getLoggedInUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/auth/auth-user`,
        {
          withCredentials: true,
        }
      );

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
    dispatch(fetchAllCartItems());
    //Send an Axios Request to the backend, and check if the user is authenticated. If Yes, then dispatch and loginUser.
  }, []);

  return (
    <>
      {loadingProducts && loadingCart ? (
        <div className="preloader-container">
          <div className="lds-dual-ring"></div>
        </div>
      ) : null}
      <ApplicationRoutes />
    </>
  );
};

export default App;
