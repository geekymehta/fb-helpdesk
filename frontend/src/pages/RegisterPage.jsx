import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  register,
  getUserFromLocalStorage,
  reset,
} from "../store/auth/authSlice";
import { z } from "zod";
import { useSelector } from "react-redux";

import Title from "../components/Title";
import styles from "./RegisterPage.module.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  const registerSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    persistUser: z.boolean(),
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    persistUser: false,
  });

  const { name, email, password, persistUser } = formData;
  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      const validatedData = registerSchema.parse(formData);
      dispatch(register(validatedData));
    } catch (error) {
      console.error(error);
      return;
    }

    console.log("Submitted");
  };

  useEffect(() => {
    console.log("useEffect");
    console.log({ user, isError, isSuccess });
    console.log({ message });

    dispatch(getUserFromLocalStorage());

    if (user || isSuccess) {
      navigate("/connect-page");
    }

    if (isError) {
      console.log(message);
      dispatch(reset());
    }

    dispatch(reset());
  }, [user, isError, isSuccess, dispatch, navigate, message]);

  return (
    <>
      <div className={styles.registerPage}>
        <p>Create Account</p>
        <form onSubmit={onSubmit} className={styles.registerPageFormContainer}>
          <Title>Create Account</Title>
          <div className={styles.formGroup}>
            <label>Name</label>
            <input
              type="text"
              className={styles.formControl}
              id="name"
              name="name"
              value={name}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Email</label>
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
          <div className="formGroup">
            <button
              type="submit"
              className={`${styles.btn} ${styles.btnBlock}`}
            >
              Sign Up
            </button>
          </div>
          <p className={styles.alt}>
            Already have an account? <Link to="/">Login</Link>{" "}
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
