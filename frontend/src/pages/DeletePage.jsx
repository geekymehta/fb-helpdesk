import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchConversations } from "../store/conversations/conversationSlice";
import { useNavigate } from "react-router-dom";
import {
  deletePages,
  setCurrentPage,
  getPagesFromLocalStorage,
} from "../store/pages/pageSlice";
import { deleteConversations } from "../store/conversations/conversationSlice";

import Spinner from "../components/Spinner";
import styles from "./DeletePage.module.css";

const DeletePage = () => {
  console.log("DeletePage");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pages, currentPage } = useSelector((state) => state.pages);
  const { isError, isLoading, isSuccess, conversations, message } = useSelector(
    (state) => state.conversations
  );

  const getConversations = useCallback(() => {
    if (pages.length === 0) {
      navigate("/connect-page");
    }
    const pageId = pages[currentPage].id;
    const pageAccessToken = pages[currentPage].access_token;
    dispatch(fetchConversations({ pageId, pageAccessToken }));
    console.log("conversations", conversations);
  });

  const deleteIntegration = useCallback(() => {
    dispatch(deletePages());
    dispatch(deleteConversations());
    navigate("/connect-page");
    console.log("Integration Deleted ");
  });

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (isSuccess) {
      navigate("/agent-screen");
    }
  }, [conversations, isSuccess, isError, message, navigate]);

  useEffect(() => {
    if (pages.length === 0) {
      navigate("/connect-page");
    }

    dispatch(setCurrentPage(pages.length - 1));
  }, [pages, navigate]);

  useEffect(() => {
    dispatch(getPagesFromLocalStorage());
  }, []);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div className={styles["delete-page"]}>
        <p className="heading">Delete Page</p>
        <button className="btn" onClick={deleteIntegration}>
          Delete Integration
        </button>
        <br />
        <button className="btn" onClick={getConversations}>
          Reply To Message
        </button>
      </div>
    </>
  );
};

export default DeletePage;
