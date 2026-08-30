import { motion } from "framer-motion";

import AIMessage from "./AIMessage";
import AITypingIndicator from "./AITypingIndicator";

import { useMessageStore } from "@/features/timetable-designer/store/message.store";

const StreamingMessage = () => {
  const streamingMessage = useMessageStore((state) => state.streamingMessage);

  const isLoading = useMessageStore((state) => state.isLoading);

  if (!streamingMessage && !isLoading) {
    return null;
  }

  if (!streamingMessage) {
    return <AITypingIndicator />;
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <AIMessage
        role={streamingMessage.role}
        content={streamingMessage.content}
      />
    </motion.div>
  );
};

export default StreamingMessage;
