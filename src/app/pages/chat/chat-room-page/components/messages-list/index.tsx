/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Icon from "@app/common/components/icons";
import useScrollToBottom from "./hooks/useScrollToBottom";
import { getMessages, Message } from "./data/get-messages";
import {
  ChatMessage,
  ChatMessageFiller,
  ChatMessageFooter,
  Container,
  Date,
  DateWrapper,
  EncryptionMessage,
  MessageGroup,
} from "./styles";

type MessagesListProps = {
  onShowBottomIcon: () => void;
  shouldScrollToBottom?: () => void;
};

export default function MessagesList(props: MessagesListProps) {
  const { onShowBottomIcon, shouldScrollToBottom } = props;

  const params = useParams();
  const [messages, setMessages] = useState<any>([]);

  const { containerRef, lastMessageRef } = useScrollToBottom(
    onShowBottomIcon,
    shouldScrollToBottom,
    params.id
  );

  const getMsgs = async () => {
    const msg = await getMessages(params.id);
    console.log(msg);
    debugger;
    setMessages(msg);
  };

  useEffect(() => {
    if (params.id) {
      getMsgs();
    }

    // eslint-disable-next-line
  }, [params.id]);
  return (
    <Container ref={containerRef}>
      <EncryptionMessage>
        <Icon id="lock" className="icon" />
        Messages are end-to-end encrypted. No one outside of this chat, not even
        WhatsApp, can read or listen to them. Click to learn more.
      </EncryptionMessage>
      <DateWrapper>
        <Date> TODAY </Date>
      </DateWrapper>
      <MessageGroup>
        {messages?.length > 0 &&
          messages?.map((message, i) => {
            if (i === messages.length - 1) {
              return (
                <SingleMessage
                  key={message.id}
                  message={message}
                  ref={lastMessageRef}
                />
              );
            } else {
              return <SingleMessage key={message.id} message={message} />;
            }
          })}
      </MessageGroup>
    </Container>
  );
}

const SingleMessage = forwardRef((props: { message: Message }, ref: any) => {
  const { message } = props;

  return (
    <ChatMessage
      key={message.id}
      className={message.isOpponent ? "chat__msg--received" : "chat__msg--sent"}
      ref={ref}
    >
      <span>{message.body}</span>
      <ChatMessageFiller />
      <ChatMessageFooter>
        <span>{message.timestamp}</span>
        {message.actor !== "user" && (
          <Icon
            id={`${
              message.messageStatus === "SENT" ? "singleTick" : "doubleTick"
            }`}
            className={`chat__msg-status-icon ${
              message.messageStatus === "READ"
                ? "chat__msg-status-icon--blue"
                : ""
            }`}
          />
        )}
      </ChatMessageFooter>
    </ChatMessage>
  );
});
