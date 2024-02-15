import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";

import styles from "./LoginPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../store/auth/authSlice";
import Spinner from "../components/Spinner";
import Title from "../components/Title";

const Login = () => {
  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const { isLoading, isError, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    try {
      const validatedData = loginSchema.parse(formData);
      console.log(validatedData);
      dispatch(login(validatedData));
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles["login-page"]}>
      <form onSubmit={onSubmit} className="login-page_form-container">
        <Title>Login to your account</Title>
        <div className="form-group">
          <label>Email</label>
          <br />
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <br />
          <input
            type="text"
            className="form-control"
            id="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={onChange}
          />
        </div>
        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
        <label> Remember Me</label>
        <div className="form-group">
          <button type="submit" className="btn btn-block">
            Login
          </button>
        </div>
      </form>
      <p className="alt">
        New to MyApp? <Link to="/register">Sign Up</Link>{" "}
      </p>
    </div>
  );
};

export default Login;
