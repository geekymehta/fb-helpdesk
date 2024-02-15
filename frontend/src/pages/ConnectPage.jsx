import React, { useEffect, useRef, useState } from "react";
import FacebookLogin from "react-facebook-login";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { fetchPages } from "../store/pages/pageSlice";

import styles from "./ConnectPage.module.css";

const ConnectPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userCredentials, setUserCredentials] = useState({});
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userCredentials.userId) {
      const fetchUserPages = async (userCredentials) => {
        await dispatch(fetchPages(userCredentials));
        navigate("/delete-page");
      };
      fetchUserPages(userCredentials);
    }
  }, [userCredentials, dispatch]);

  const responseFacebook = (response) => {
    if (response.id) {
      setUserCredentials({
        userId: response.id,
        userAccessToken: response.accessToken,
      });
      console.log({
        userId: response.id,
        userAccessToken: response.accessToken,
      });
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      console.log("user not found or user token expired");
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className={styles["connect-page"]}>
        <p className="heading">Facebook Page Integration</p>
        <FacebookLogin
          appId="930876614928754"
          autoLoad={false}
          scope="public_profile,pages_messaging,pages_show_list,pages_manage_metadata,pages_read_engagement"
          callback={responseFacebook}
          textButton="Connect Page"
          cssClass="my-facebook-button-class"
        />
      </div>
    </>
  );
};

export default ConnectPage;
