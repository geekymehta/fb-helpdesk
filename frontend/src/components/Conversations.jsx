import ConversationList from "./ConversationList";
import ChatWindow from "./ChatWindow";
import styles from "./Conversations.module.css";
import { memo } from "react";

const Conversations = () => {
  console.log("ConversationsComponent");
  return (
    <>
      <div className={styles.Conversations}>
        <ConversationList />
        <ChatWindow />
      </div>
    </>
  );
};

export default memo(Conversations);
