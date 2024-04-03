import React, { useEffect, useState } from "react";
import { inbox } from "../data/inbox";
import { Inbox } from "@app/common/types/common.type";
import axios from "axios";

type User = {
  name: string;
  image: string;
};

type ChatContextProp = {
  user: User;
  inbox: Inbox[];
  activeChat?: Inbox;
  onChangeChat: (chat: Inbox) => void;
};

const initialValue: ChatContextProp = {
  user: { name: "Simmy Bajaj", image: "/assets/images/girl.jpeg" },
  inbox,
  onChangeChat() {
    throw new Error();
  },
};

export const ChatContext = React.createContext<ChatContextProp>(initialValue);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ChatProvider(props: { children: any }) {
  const { children } = props;

  const [user] = useState<User>(initialValue.user);
  const [inbox, setInbox] = useState<Inbox[]>(initialValue.inbox);
  const [activeChat, setActiveChat] = useState<Inbox>();

  const handleChangeChat = (chat: Inbox) => {
    console.log(chat);
    debugger
    setActiveChat(chat);
  };

  const getUserData = async () => {
    const data = await axios.get(
      "https://us-central1-visof-new-vuja.cloudfunctions.net/middleware/users"
    );
    console.log(data.data);

    const newData = data?.data?.map((datum: any) => {
      return {
        id: datum.phone,
        name: datum.name,
        image: "/assets/images/boy2.jpeg",
        lastMessage: "",
        notificationsCount: 0,
        messageStatus: "SENT",
        timestamp: "12:15",
        isPinned: false,
        isOnline: false,
      };
    });
    if (newData?.length) {
      setInbox(newData);
    }
    return newData;
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <ChatContext.Provider
      value={{ user, inbox, activeChat, onChangeChat: handleChangeChat }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChatContext = () => React.useContext(ChatContext);
