import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ChatProvider from "@app/pages/chat/context/chat";
const ChatPage = React.lazy(() => import("@app/pages/chat/chat-room-page"));
const UnSelectedChatPage = React.lazy(() => import("@app/pages/chat/unselected-page"));

const router = createBrowserRouter([
  {
    path: "/:id",
    element: <ChatPage />,
  },
  {
    path: "/",
    element: <UnSelectedChatPage />,
  },
]);

export default function AppRoutes() {
  return (
    <ChatProvider>
      <RouterProvider router={router} />
    </ChatProvider>
  );
}
