import { useEffect } from "react";

import { registerMessageListeners } from "../socket/listeners/message.listeners";

export const useMessageListeners = () => {
  useEffect(() => {
    return registerMessageListeners();
  }, []);
};
