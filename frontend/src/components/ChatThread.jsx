import React, { useEffect, useState } from "react";
import styles from "./ChatThread.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  sendTextMessage,
  reset,
  fetchConversations,
} from "../store/conversations/conversationSlice";
import MessageCard from "./MessageCard";

const ChatThread = ({ currentConversation, participants, canReply }) => {
  const imageUrl = `https://scontent.fdel3-3.fna.fbcdn.net/v/t1.30497-1/84628273_176159830277856_972693363922829312_n.jpg?stp=c15.0.50.50a_cp0_dst-jpg_p50x50&_nc_cat=1&ccb=1-7&_nc_sid=810bd0&_nc_ohc=1IEA7QUVPPQAX_g-I4G&_nc_ht=scontent.fdel3-3.fna&edm=AP4hL3IEAAAA&oh=00_AfAt_ufy77bAUnneqH0CYJ46ECECc0qZ3mlh1Y19U2Lfew&oe=65F7CE59`;

  const [messages, setMessages] = useState([]);
  const { isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.conversations
  );
  const { pages, currentPage, profileData } = useSelector(
    (state) => state.pages
  );
  const { LastMessageTime } = useSelector((state) => state.chatWith);
  const [textInput, setTextInput] = useState("");
  const dispatch = useDispatch();

  const userPicUrl = profileData.picture.data.url || imageUrl;

  let name = "";
  if (participants.length > 0) {
    name = participants[0].name;
  }

  const inputChangeHandler = (event) => {
    setTextInput(event.target.value);
  };

  const sendMessage = (event) => {
    event.preventDefault();
    // { pageId, pageAccessToken, recipientPSId, inputText }
    if (event.key === "Enter" && textInput.trim() !== "" && canReply) {
      try {
        let recipientPSId = "";
        let pageId = "";
        let pageAccessToken = "";
        if (pages.length > 0) {
          pageId = pages[currentPage].id;
          pageAccessToken = pages[currentPage].access_token;
        } else {
          throw new Error("No page found");
        }

        if (participants.length > 0) {
          recipientPSId = participants[0].id;
        } else {
          throw new Error("No recipient found");
        }

        const payload = {
          pageId,
          pageAccessToken,
          recipientPSId,
          inputText: textInput,
        };
        dispatch(sendTextMessage(payload));
        dispatch(
          fetchConversations({
            pageId: pages[currentPage].id,
            pageAccessToken: pages[currentPage].access_token,
          })
        );
        setTextInput("");
      } catch (error) {
        console.log("Error in sending message", error);
      }
    }
  };

  useEffect(() => {
    const tempMessages = [...currentConversation];
    for (let i = 0; i < tempMessages.length; i++) {
      if (i == 0 || tempMessages[i].from.id != tempMessages[i - 1].from.id) {
        tempMessages[i] = { ...tempMessages[i], last: true };
      }
    }
    tempMessages.reverse();
    setMessages(tempMessages);
  }, [currentConversation]);

  useEffect(() => {
    if (isError) {
      console.error(message);
      dispatch(reset());
    } else if (isLoading) {
      console.log(message);
    } else if (isSuccess) {
      console.log(message);

      dispatch(reset());
    }
  }, [isSuccess, isError, isLoading]);

  return (
    <>
      <div className={styles.currentThreadMaster}>
        <div className={styles.currentThread}>
          <h1 className={styles.profName}>{name}</h1>
        </div>
        <div className={styles.chats}>
          <div className={styles.messages}>
            {messages.map((message) => (
              <MessageCard
                key={message.id}
                message={message}
                isRight={message.from.name !== name}
                profilePic={message.from.name === name ? imageUrl : userPicUrl}
                isLast={message.last}
                senderName={
                  message.from.name === name ? name : profileData.name
                }
              />
            ))}
          </div>
          <div className={styles.messageInputMaster}>
            <input
              className={styles.inputMessage}
              type="text"
              placeholder={
                LastMessageTime > 24
                  ? "You can't reply as it has been more than 24 hours since customer's last message."
                  : `Message ${name}`
              }
              value={textInput}
              onChange={inputChangeHandler}
              onKeyUp={sendMessage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatThread;
