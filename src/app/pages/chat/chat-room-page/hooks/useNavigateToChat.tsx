import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * If no chat inbox selected, need to navigate to chat page,
 * maybe user reload the page
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useNavigateToChat(activeInbox?: any) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!activeInbox) {
      navigate("/");
    }
  }, [activeInbox, navigate]);
}
