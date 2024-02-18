import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./ChatWith.module.css";
import { setLastMessageTime } from "../store/chat/chatWithSlice";
import { useDispatch } from "react-redux";

const ChatWith = ({
  conversationId,
  name,
  lastMessage,
  unreadCount,
  canReply,
  timeDelta,
  time,
  subject,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useLocation();

  const [currentConversation, setCurrentConversation] = useState([]);

  const diffTimeInHours = (time) => {
    const date = new Date(time);
    if (isNaN(date.getTime())) {
      console.error(`Invalid date: ${time}`);
      return;
    }

    const diffInMilliseconds = new Date() - date;
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
    dispatch(setLastMessageTime(Number(diffInHours.toFixed(2))));
  };

  useEffect(() => {
    if (time) {
      diffTimeInHours(time);
    }
  }, [time, lastMessage, currentConversation]);

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
        {timeDelta && <p>{timeDelta}</p>}
      </div>
      {lastMessage && (
        <div className={styles.messageContainer}>
          <div>
            <h4>{subject || "Empty Subject"}</h4>

            <p>{lastMessage}</p>
          </div>
          {/* {unreadCount > 0 && <p>{unreadCount}</p>} */}
        </div>
      )}
    </div>
  );
};

export default ChatWith;
