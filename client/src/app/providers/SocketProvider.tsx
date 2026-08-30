import { useEffect, type ReactNode } from "react";
import { toast } from "sonner";

import { socketService } from "@/shared/socket/socket.service";
import { useSocketStore } from "@/shared/socket/socket.store";
import ConnectingScreen from "@/shared/components/ConnectingScreen";
import { authService } from "@/features/auth/services/auth.service";
import { Outlet } from "react-router-dom";

const SocketProvider = () => {
  const status = useSocketStore((state) => state.status);
  const setStatus = useSocketStore((state) => state.setStatus);

  useEffect(() => {
    const socket = socketService.getSocket();

    const handleConnect = () => {
      setStatus("connected");
    };

    const handleDisconnect = () => {
      setStatus("disconnected");
    };

    const handleConnectError = async (error: Error) => {
      if (error.message === "Forbidden") {
        try {
          await authService.refreshToken();

          socketService.updateToken();
          socketService.connect();

          return;
        } catch {
          setStatus("disconnected");
          return;
        }
      }

      setStatus("reconnecting");
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_error", handleConnectError);

    setStatus("connecting");

    socketService.connect();

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect_error", handleConnectError);

      socketService.disconnect();
    };
  }, [setStatus]);

  if (status !== "connected") {
    return <ConnectingScreen />;
  }

  return <Outlet />;
};

export default SocketProvider;
