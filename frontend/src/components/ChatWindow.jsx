import { useState, useEffect } from "react";
import ChatThread from "./ChatThread";
import Profile from "./Profile";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styles from "./ChatWindow.module.css";

const ChatWindow = () => {
  const { search } = useLocation();

  const [currentConversation, setCurrentConversation] = useState([]);
  const [profile, setProfile] = useState(null);
  const [conversationId, setConversationId] = useState(null);

  const { conversations } = useSelector((state) => state.conversations);

  useEffect(() => {
    if (conversations && conversations.data) {
      const query = new URLSearchParams(search);
      const id = query.get("conversationId");
      setConversationId(id);
      if (id) {
        const conversation = conversations.data.find(
          (conversation) => conversation.id === id
        );
        if (conversation) {
          setCurrentConversation(conversation);
          setProfile(conversation.participants.data[0]);
        }
      }
    }
  }, [search, conversations]);

  return (
    <>
      <div className={styles.masterChat}>
        {currentConversation &&
          currentConversation.messages &&
          currentConversation.participants && (
            <ChatThread
              currentConversation={currentConversation.messages.data}
              participants={currentConversation.participants.data}
              canReply={currentConversation.can_reply}
            />
          )}
        {conversationId && profile && <Profile profile={profile} />}
      </div>
    </>
  );
};

export default ChatWindow;
