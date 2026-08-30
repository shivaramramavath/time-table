import { memo } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

import { Button } from "@/shared/ui/button";

import AIHeader from "./AIHeader";
import AIConversation from "./AIConversation";
import AIPrompt from "./AIPrompt";
import AISuggestions from "./AISuggestions";
import { useMessageListeners } from "@/features/timetable-designer/hooks/useMessageListeners";

interface Props {
  onClose: () => void;
}

const AIAssistantPanel = ({ onClose }: Props) => {
  useMessageListeners();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
        scale: 0.97,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: 20,
        scale: 0.97,
      }}
      transition={{
        duration: 0.2,
      }}
      className="
        flex
        h-[min(680px,calc(100vh-120px))]
        w-[380px]
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-border
        bg-background
        shadow-2xl
      "
    >
      {/* Header */}
      <div className="relative">
        <AIHeader />

        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute right-2 top-2 size-8 rounded-lg"
        >
          <X className="size-4" />
        </Button>
      </div>

      {/* Conversation */}
      <AIConversation />

      {/* Bottom composer */}
      <div
        className="
          relative shrink-0 bg-gradient-to-t from-background via-background/95 to-background/0 pt-20
        "
      >
        <AISuggestions />
        <AIPrompt />
      </div>
    </motion.div>
  );
};

export default memo(AIAssistantPanel);
