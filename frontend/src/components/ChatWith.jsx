import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./ChatWith.module.css";
import { set } from "mongoose";

const ChatWith = ({
  conversationId,
  name,
  lastMessage,
  unreadCount,
  canReply,
  time,
  subject,
}) => {
  const navigate = useNavigate();
  const { search } = useLocation();

  const [currentConversation, setCurrentConversation] = useState([]);

  useEffect(() => {
    const query = new URLSearchParams(search);
    const conversationId = query.get("conversationId");
    setCurrentConversation(conversationId);
  }, [search]);

  const navigateToConversation = () => {
    const pathName = location.pathname.slice(
      0,
      location.pathname.lastIndexOf("/")
    );
    navigate(`${pathName}?conversationId=${conversationId}`);

    console.log("navigateToConversation");
  };

  return (
    <div
      className={[
        styles.chatWith,
        conversationId == currentConversation ? styles.selected : undefined,
      ].join(" ")}
      onClick={navigateToConversation}
    >
      <div className={styles.masterContainer}>
        <input type="checkbox" />
        <div>
          <h3>{name}</h3>
          <p>Facebook DM</p>
        </div>
        {time && <p>{time}</p>}
      </div>
      {lastMessage && (
        <div className={styles.messageContainer}>
          <div>
            <h4>{subject}</h4>
            <p>{lastMessage}</p>
          </div>
          {/* {unreadCount > 0 && <p>{unreadCount}</p>} */}
        </div>
      )}
    </div>
  );
};

export default ChatWith;
