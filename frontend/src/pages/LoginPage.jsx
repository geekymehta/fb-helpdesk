import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";

import styles from "./LoginPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset, getUserFromLocalStorage } from "../store/auth/authSlice";
import Spinner from "../components/Spinner";
import Title from "../components/Title";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    persistUser: false,
  });
  const { email, password, persistUser } = formData;

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Validation schema for the login
  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    persistUser: z.boolean(),
  });

  const onSubmit = (e) => {
    e.preventDefault();

    try {
      const validatedData = loginSchema.parse(formData);
      dispatch(login(validatedData));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
      dispatch(reset());
    }

    if (isSuccess || user) {
      navigate("/connect-page");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, dispatch, navigate, message]);

  useEffect(() => {
    dispatch(getUserFromLocalStorage());
  }, []);

  return (
    <>
      <div className={styles["loginPage"]}>
        <form onSubmit={onSubmit} className={styles.loginPageFormContainer}>
          <Title>Login to your account</Title>
          <div className={styles.formGroup}>
            <label>Email</label>
            <br />
            <input
              type="text"
              className={styles.formControl}
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Password</label>
            <br />
            <input
              type="text"
              className={styles.formControl}
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={onChange}
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="checkbox"
              id="persistUser"
              name="persistUser"
              checked={persistUser}
              onChange={onChange}
            />
            <label> Remember Me</label>
          </div>
          <div className={styles.formGroup}>
            <button
              type="submit"
              className={`${styles.btn} ${styles.btnBlock}`}
            >
              Login
            </button>
          </div>
          <p className={styles.alt}>
            New to MyApp? <Link to="/register">Sign Up</Link>{" "}
          </p>
        </form>
      </div>
      {isLoading && <Spinner />}
    </>
  );
};

export default Login;
