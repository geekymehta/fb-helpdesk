import React from "react";
import styles from "./messageCard.module.css";

const MessageCard = ({ message, isRight, isLast, profilePic, senderName }) => {
  const createdAt = (createdTime) => {
    let date = new Date(createdTime);
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
  return (
    <div
      key={message.id}
      className={`${styles.messageCard} ${isRight ? styles.right : undefined}`}
    >
      <div className={styles.messageAvatar}>
        {isLast && <img src={profilePic} alt="" />}
      </div>
      <div className={styles.message}>
        <div className={styles.messageContent}>
          <div className={styles.messageContentMessage}>{message.message}</div>
          {message.last && (
            <div className={styles.messageContentName}>
              {senderName} - {createdAt(message.created_time)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
