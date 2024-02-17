import React, { useEffect } from "react";
import ReactJson from "react-json-view";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversations } from "../store/conversations/conversationSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Conversations from "../components/Conversations";
import styles from "./AgentScreen.module.css";
import { getPagesFromLocalStorage } from "../store/pages/pageSlice";
const AgentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pages, currentPage } = useSelector((state) => state.pages);
  const { conversations } = useSelector((state) => state.conversations);

  const currentViewPage = pages[currentPage];

  useEffect(() => {
    const repeatFetchConversations = () => {
      if (currentViewPage) {
        const { id, access_token } = currentViewPage;

        dispatch(
          fetchConversations({ pageId: id, pageAccessToken: access_token })
        );
      }
    };
    const intervalId = setInterval(repeatFetchConversations, 5000);

    return () => clearInterval(intervalId);
  }, [
    dispatch,
    fetchConversations,
    currentViewPage,
    navigate,
    pages,
    currentPage,
  ]);

  useEffect(() => {
    dispatch(getPagesFromLocalStorage());

    if (pages.length === 0) {
      navigate("/delete-page");
    }
  }, []);

  useEffect(() => {
    if (!conversations || conversations.length === 0) {
      navigate("/delete-page");
    }
  }, [pages, conversations, navigate]);

  return (
    <>
      {/* <p>Agent Screen(Data)</p> */}
      <div className={styles["agent-screen"]}>
        <Navbar />
        <Conversations />
      </div>
      {/* <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h2>FOR DEVELOPMENT PURPOSES(Data to be rendered in json format)</h2>
      <ReactJson src={conversations} /> */}
    </>
  );
};

export default AgentScreen;
