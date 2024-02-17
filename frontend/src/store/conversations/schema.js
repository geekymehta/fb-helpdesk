// Accessing the main data array
const dataArray = jsonData.data;

// Loop through each item in the data array
for (const item of dataArray) {
  // Accessing participants data
  const participants = item.participants.data;

  // Loop through each participant
  for (const participant of participants) {
    const participantName = participant.name;
    const participantEmail = participant.email;
    const participantId = participant.id;

    // Do something with participant details
  }

  // Accessing messages data
  const messages = item.messages.data;

  // Loop through each message
  for (const message of messages) {
    const messageId = message.id;
    const messageToData = message.to.data[0]; // Assuming there's only one recipient
    const messageToName = messageToData.name;
    const messageToEmail = messageToData.email;
    const messageToId = messageToData.id;
    const messageFrom = message.from;
    const messageFromName = messageFrom.name;
    const messageFromEmail = messageFrom.email;
    const messageFromId = messageFrom.id;
    const messageCreatedTime = message.created_time;
    const messageContent = message.message;

    // Do something with message details
  }

  // Accessing other properties
  const canReply = item.can_reply;
  const itemId = item.id;
  const messageCount = item.message_count;
  const unreadCount = item.unread_count;
}

// Accessing paging data
const paging = jsonData.paging;
const cursors = paging.cursors;
const beforeCursor = cursors.before;
const afterCursor = cursors.after;
