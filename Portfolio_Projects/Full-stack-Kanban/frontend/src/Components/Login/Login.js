import React from "react";
import "./login.css";
import { selectTheme } from "../../Redux/features/Slices/Toggler/Toggler";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { selectIsLoggedIn } from "../../Redux/features/Slices/Auth/Auth";
import { logInUser } from "../../Redux/features/Slices/Auth/Auth";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const loggedIn = useSelector(selectIsLoggedIn);
  const userAlreadyLoggedIn = () => {
    if (loggedIn) {
      navigate("/");
    }
  };

  useEffect(() => {
    userAlreadyLoggedIn();
  }, [loggedIn]);
  const handleSubmit = async (e) => {
    console.log("function running");
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/auth/login`,
        user
      );
      console.log(("response", response));
      const status = response.data.status;
      console.log("status", status);
      if (status === "success") {
        const { user, token } = response.data;
        console.log("User in login", user);
        console.log("Token in login", token);
        dispatch(logInUser({ token, user }));

        navigate("/");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const mode = useSelector(selectTheme);
  return (
    <>
      <div className="container" id={`content-${mode}`}>
        {" "}
        <section className="vh-100 container">
          <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-9 col-lg-6 col-xl-5">
                <img
                  src="https://jobs.rhacc.ac.uk/Upload/Content/images/122/login.png"
                  className="img-fluid"
                  alt="Sample image"
                />
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3">Log in with</p>
                  <div className="row">
                    <div className="col-md-3">
                      <button
                        // onClick={() => googleHandler()}
                        className="btn btn-outline-dark"
                        style={{ textTransform: "none" }}
                      >
                        <img
                          style={{
                            width: "20px",
                            marginBottom: "3px",
                            marginRight: "5px",
                          }}
                          alt="Google sign-in"
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                        />
                        Login with Google
                      </button>
                    </div>
                  </div>
                </div>

                <form onSubmit={(e) => handleSubmit(e)}>
                  <div className="divider d-flex align-items-center my-4">
                    <p className="text-center fw-bold mx-3 mb-0">Or</p>
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="email">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control form-control-lg"
                      placeholder="Enter a valid email address"
                      value={user.email}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                      name="email"
                    />
                  </div>

                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control form-control-lg"
                      placeholder="Enter password"
                      value={user.password}
                      onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                      }
                      name="password"
                    />
                  </div>

                  <div className="text-center text-lg-start mt-4 pt-2">
                    {mode == "light" ? (
                      <button
                        type="sumbit"
                        className={` btn btn-primary btn-lg `}
                        onClick={(e) => handleSubmit(e)}
                      >
                        Login
                      </button>
                    ) : (
                      <button
                        type="sumbit"
                        className={` btn btn-outline-info btn-lg `}
                        onClick={(e) => handleSubmit(e)}
                      >
                        Login
                      </button>
                    )}
                    <p className="small fw-bold mt-2 pt-1 mb-0">
                      Don't have an account?{" "}
                      <Link to="/register" className="link-danger">
                        Register
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;