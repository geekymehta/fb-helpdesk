import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { register } from "../store/auth/authSlice";
import styles from "./RegisterPage.module.css";
import { z } from "zod";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      const validatedData = registerSchema.parse(formData);
      console.log(validatedData);
    } catch (error) {
      console.error(error);
      return;
    }
    dispatch(register(formData));
    navigate("/");

    console.log("Submitted");
  };

  return (
    <>
      <div className={styles["register-page"]}>
        <p>Create Accouynt</p>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <br />
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
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
              Sign Up
            </button>
          </div>
        </form>

        <p>
          Already have an account? <Link to="/">Login</Link>{" "}
        </p>
      </div>
    </>
  );
};

export default Register;
