import React, { useEffect, useState } from "react";
import styles from "./ChatThread.module.css";
import { useSelector } from "react-redux";

const ChatThread = ({ currentConversation, participants }) => {
  const imageUrl = `https://scontent.fdel3-3.fna.fbcdn.net/v/t1.30497-1/84628273_176159830277856_972693363922829312_n.jpg?stp=c15.0.50.50a_cp0_dst-jpg_p50x50&_nc_cat=1&ccb=1-7&_nc_sid=810bd0&_nc_ohc=1IEA7QUVPPQAX_g-I4G&_nc_ht=scontent.fdel3-3.fna&edm=AP4hL3IEAAAA&oh=00_AfAt_ufy77bAUnneqH0CYJ46ECECc0qZ3mlh1Y19U2Lfew&oe=65F7CE59`;

  const [messages, setMessages] = useState([]);
  const { profileData } = useSelector((state) => state.pages);

  const userPicUrl = profileData.picture.data.url || imageUrl;

  // const messageFrom = message.from.name;

  let name = "";
  if (participants.length > 0) {
    name = participants[0].name;
    console.log("name", name);
  }

  const createdAt = (createdTime) => {
    let date = new Date("2024-02-17T15:04:54+0000");
    let istDate = date.toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      weekday: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return istDate;
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
    console.log("tempMessages", tempMessages);
    console.log("currentConversation", currentConversation);
  }, [currentConversation]);
  return (
    <>
      <div className={styles.currentThreadMaster}>
        <div className={styles.currentThread}>
          <h1 className={styles.profName}>{name}</h1>
        </div>
        <div className={styles.chats}>
          <div className={styles.messages}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.masterContainer} ${
                  message.from.name === name ? "" : styles.right
                }`}
              >
                <div className={styles.messageAvatar}>
                  {message.last && (
                    <img
                      src={message.from.name === name ? imageUrl : userPicUrl}
                      alt=""
                    />
                  )}
                </div>
                <div className={styles.message}>
                  <div className={styles.messageContent}>
                    <div className={styles.messageContentMessage}>
                      {message.message}
                    </div>
                    {message.last && (
                      <div className={styles.messageContentName}>
                        {message.from.name === name ? name : profileData.name}
                        {" - "}
                        {createdAt(message.created_time)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.messageInputMaster}>
            <input
              className={styles.inputMessage}
              type="text"
              placeholder={`Message to ${name}`}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatThread;
