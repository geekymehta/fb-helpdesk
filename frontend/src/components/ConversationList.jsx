import { memo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ChatWith from "./ChatWith";
import styles from "./ConversationList.module.css";

const ConversationList = () => {
  const { conversations } = useSelector((state) => state.conversations);

  const dataArray = conversations.data;
  const getTimerDelta = (time) => {
    const date = new Date(time);
    const now = new Date();
    const delta = now - date;
    const seconds = Math.floor(delta / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    if (minutes > 0) return `${minutes}m`;
    if (seconds > 0) return `${seconds}s`;
  };

  return (
    <>
      <div className={styles.conversationsList}>
        <div className={styles.masterContainer}>
          <div className={styles.masterUpper}>
            <button>
              <img className={styles.hamburger} src="./hamburger.png" alt="" />
            </button>
            <h1>Conversations</h1>
          </div>
          <div className={styles.masterReload}>
            <button>
              <Link to="/">
                <img className={styles.reload} src="./reload.png" alt="" />
              </Link>
            </button>
          </div>
        </div>
        <div className={styles.conversations}>
          {dataArray &&
            Array.isArray(dataArray) &&
            dataArray.map((conversation) => (
              <ChatWith
                key={conversation.id}
                conversationId={conversation.id}
                name={conversation.participants.data[0].name}
                lastMessage={
                  conversation.messages.data
                    ? conversation.messages.data[0].message
                    : null
                }
                unreadCount={conversation.unread_count}
                canReply={conversation.can_reply}
                time={
                  conversation.messages.data
                    ? getTimerDelta(conversation.messages.data[0].created_time)
                    : null
                }
                subject={
                  conversation.messages.data
                    ? conversation.messages.data[0].subject
                    : null
                }
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default memo(ConversationList);
