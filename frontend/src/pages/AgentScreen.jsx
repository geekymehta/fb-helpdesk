import React, { useEffect } from "react";
import ReactJson from "react-json-view";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversations } from "../store/conversations/conversationSlice";
import { useNavigate } from "react-router-dom";

const AgentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { pages, currentPage } = useSelector((state) => state.pages);
  const { conversations } = useSelector((state) => state.conversations);

  const currentViewPage = pages[currentPage];

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
      return;
    } else if (pages.length === 0 || currentPage === -1) {
      navigate("/connect-page");
      return;
    }
    const repeatFetchConversations = async () => {
      const { id, access_token } = currentViewPage;
      await dispatch(
        fetchConversations({ pageId: id, pageAccessToken: access_token })
      );
    };
    const intervalId = setInterval(repeatFetchConversations, 5000);

    return () => clearInterval(intervalId);
  }, [
    dispatch,
    fetchConversations,
    currentViewPage,
    isLoggedIn,
    navigate,
    pages,
    currentPage,
  ]);

  return (
    <>
      <p>Agent Screen(Data)</p>
      <ReactJson src={conversations} />
    </>
  );
};

export default AgentScreen;
