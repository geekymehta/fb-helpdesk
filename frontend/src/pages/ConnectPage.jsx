import React, { useCallback, useEffect, useState } from "react";
import FacebookLogin from "react-facebook-login";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Spinner from "../components/Spinner";
import styles from "./ConnectPage.module.css";
import {
  fetchPages,
  getPagesFromLocalStorage,
  reset,
} from "../store/pages/pageSlice";
import Title from "../components/Title";

const ConnectPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const facebookAppId = import.meta.env.VITE_FACEBOOK_APP_ID;
  const { pages, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.pages
  );

  const [userFacebookCredentials, setUserFacebookCredentials] = useState(null);

  const responseFacebook = useCallback((response) => {
    if (response.id) {
      console.log("response", response);
      setUserFacebookCredentials({
        userId: response.id,
        userAccessToken: response.accessToken,
      });
    } else {
      console.log("User cancelled the login or did not fully authorize.");
    }
  }, []);

  useEffect(() => {
    if (userFacebookCredentials) {
      dispatch(fetchPages(userFacebookCredentials));
    }
  }, [userFacebookCredentials, dispatch]);

  useEffect(() => {
    if (isError) {
      dispatch(reset());
    }
    if (pages.length > 0 || isSuccess) {
      navigate("/delete-page");
    }
    dispatch(reset());
  }, [pages, isError, isSuccess, dispatch, navigate, message]);

  useEffect(() => {
    dispatch(getPagesFromLocalStorage());
    if (!user) {
      console.log("User not found or user token expired");
      navigate("/");
    }
  }, [user, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className={styles.connectPage}>
        <div className={styles.connectPageContainer}>
          <Title>Facebook Page Integration</Title>
          <div>
            <FacebookLogin
              appId={facebookAppId}
              autoLoad={false}
              scope="public_profile,email,pages_messaging,pages_show_list,pages_manage_metadata,pages_read_engagement"
              callback={responseFacebook}
              textButton="Connect Page"
              cssClass={`${styles.btn}`}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ConnectPage;
