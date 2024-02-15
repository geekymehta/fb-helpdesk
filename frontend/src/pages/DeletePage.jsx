import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchConversations } from "../store/conversations/conversationSlice";
import { useNavigate } from "react-router-dom";
import { deletePages, setCurrentPage } from "../store/pages/pageSlice";
import {
  deleteConversations,
  resetGoToAgentScreen,
} from "../store/conversations/conversationSlice";

import styles from "./DeletePage.module.css";

const DeletePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pages } = useSelector((state) => state.pages);
  const { goToAgentScreen } = useSelector((state) => state.conversations);
  // const { pages, currentpage } = useSelector((state) => state.pages);
  const { conversations } = useSelector((state) => state.conversations);

  const currentpage = pages.length - 1;
  console.log("length", pages.length);

  let pageId;
  let pageAccessToken;
  console.log("pages", pages);
  console.log("currentpage", currentpage);
  if (pages.length > 0) {
    pageId = pages[currentpage].id;
    pageAccessToken = pages[currentpage].access_token;
  } else {
    console.log("No pages found");
  }

  const getConversations = async () => {
    if (pages.length === 0) {
      navigate("/connect-page");
    }
    const pageId = pages[currentpage].id;
    const pageAccessToken = pages[currentpage].access_token;
    await dispatch(fetchConversations({ pageId, pageAccessToken }));
    console.log("conversations", conversations);
  };

  const deleteIntegration = () => {
    dispatch(deletePages());
    dispatch(deleteConversations());
    navigate("/connect-page");
    console.log("Integration Deleted ");
  };

  useEffect(() => {
    console.log("conversations", conversations);
  }, [conversations]);

  useEffect(() => {
    if (goToAgentScreen) {
      navigate("/agent-screen");
      dispatch(resetGoToAgentScreen());
    }
  }, [goToAgentScreen]);

  useEffect(() => {
    dispatch(setCurrentPage(currentpage));
  }, [currentpage]);

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
