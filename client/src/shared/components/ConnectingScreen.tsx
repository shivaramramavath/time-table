import { Button } from "../ui/button";
import { socketService } from "../socket/socket.service";
import { useSocketStore } from "../socket/socket.store";

const ConnectingScreen = () => {
  const status = useSocketStore((state) => state.status);

  const isDisconnected = status === "disconnected";

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        {!isDisconnected && (
          <div className="mx-auto mb-3 size-6 animate-spin rounded-full border-2 border-muted border-t-primary" />
        )}

        <p className="text-sm font-medium capitalize">
          {status}
          {!isDisconnected && "..."}
        </p>

        <p className="mt-1 text-xs text-muted-foreground">
          {isDisconnected
            ? "Realtime connection could not be established"
            : "Establishing realtime connection"}
        </p>

        {isDisconnected && (
          <Button
            type="button"
            size="sm"
            className="mt-4"
            onClick={() => socketService.connect()}
          >
            Retry
          </Button>
        )}
      </div>
    </div>
  );
};

export default ConnectingScreen;
