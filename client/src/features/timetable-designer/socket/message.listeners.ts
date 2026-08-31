import { socketService } from "@/shared/socket/socket.service";

import {
  useMessageStore,
  type MessageStatusEvent,
} from "../store/message.store";

interface MessageStartEvent {
  messageId: string;
}

interface MessageTokenEvent {
  messageId: string;
  content: string;
  seq: number;
  timestamp: number;
}

interface MessageErrorEvent {
  message: string;
}

export const registerMessageListeners = () => {
  const socket = socketService.getSocket();

  const handleRunStart = ({ messageId }: MessageStartEvent) => {
    console.log("AI run started:", messageId);

    useMessageStore.getState().start(messageId);
  };

  const handleToken = (token: MessageTokenEvent) => {
    useMessageStore.getState().update(token);
  };

  const handleStatus = (event: MessageStatusEvent) => {
    useMessageStore.getState().setStatus(event);
  };

  const handleRunFinish = ({ messageId }: MessageStartEvent) => {
    console.log("AI run finished:", messageId);

    useMessageStore.getState().finish(messageId);
  };

  const handleRunError = ({ message }: MessageErrorEvent) => {
    console.error("AI error:", message);

    useMessageStore.getState().finish();
  };

  socket.on("message:start", handleRunStart);
  socket.on("message:token", handleToken);
  socket.on("message:status", handleStatus);
  socket.on("message:finish", handleRunFinish);
  socket.on("message:error", handleRunError);

  return () => {
    socket.off("message:start", handleRunStart);
    socket.off("message:token", handleToken);
    socket.off("message:status", handleStatus);
    socket.off("message:finish", handleRunFinish);
    socket.off("message:error", handleRunError);
  };
};
