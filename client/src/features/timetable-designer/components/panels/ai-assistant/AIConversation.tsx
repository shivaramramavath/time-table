import { memo, useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import AIMessage from "./AIMessage";
import AITopRef from "./AITopRef";

import { messageService } from "@/features/timetable-designer/services/message.service";
import { useMessageStore } from "@/features/timetable-designer/store/message.store";
import type { Message } from "@/features/timetable-designer/types";
import EmptyConversation from "./EmptyConversation";
import StreamingMessage from "./StreamingMessage";

const AIConversation = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef(1);
  const initializedRef = useRef(false);
  const previousMessageCountRef = useRef(0);

  const messages = useMessageStore((state) => state.messages);
  const isLoading = useMessageStore((state) => state.isLoading);
  const hasMore = useMessageStore((state) => state.hasMore);

  const loadMore = useCallback(async () => {
    const container = scrollRef.current;

    if (!container) return;

    const previousHeight = container.scrollHeight;
    const previousTop = container.scrollTop;

    const hasMoreMessages = await messageService.get(pageRef.current + 1);

    pageRef.current += 1;

    requestAnimationFrame(() => {
      const newHeight = container.scrollHeight;

      container.scrollTop = previousTop + (newHeight - previousHeight);
    });

    if (!hasMoreMessages) {
      return;
    }
  }, []);

  useEffect(() => {
    if (initializedRef.current) return;

    initializedRef.current = true;

    const loadInitialMessages = async () => {
      await messageService.get(1);

      pageRef.current = 1;

      requestAnimationFrame(() => {
        const container = scrollRef.current;

        if (!container) return;

        container.scrollTop = container.scrollHeight;
      });
    };

    loadInitialMessages();
  }, []);

  useEffect(() => {
    const currentCount = messages.length;
    const previousCount = previousMessageCountRef.current;

    if (currentCount <= previousCount) {
      previousMessageCountRef.current = currentCount;
      return;
    }

    const lastMessage = messages[messages.length - 1];

    if (lastMessage?.role === "user") {
      requestAnimationFrame(() => {
        const container = scrollRef.current;

        if (!container) return;

        container.scrollTop = container.scrollHeight;
      });
    }

    previousMessageCountRef.current = currentCount;
  }, [messages]);

  useEffect(() => {
    if (!isLoading) return;

    const container = scrollRef.current;

    if (!container) return;

    requestAnimationFrame(() => {
      container.scrollTop = container.scrollHeight;
    });
  }, [isLoading]);

  return (
    <div className="relative min-h-0 flex-1">
      <div ref={scrollRef} className="h-full overflow-y-auto p-3 scrollbar">
        <AITopRef hasMore={hasMore} loadMore={loadMore} />

        {!messages.length && !isLoading && <EmptyConversation />}

        <AnimatePresence initial={false}>
          {messages.map((message: Message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <AIMessage role={message.role} content={message.content} />
            </motion.div>
          ))}

          <StreamingMessage />
        </AnimatePresence>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-background to-transparent" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

export default memo(AIConversation);
