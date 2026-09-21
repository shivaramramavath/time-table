import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

import { Button } from '@/shared/ui/button';

interface Props {
  onClick: () => void;
}

const AIAssistantTrigger = ({ onClick }: Props) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.9,
        y: 10,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
    >
      <Button
        onClick={onClick}
        size="lg"
        className="
          h-11 rounded-full
          gap-2 px-5
          shadow-lg
          shadow-primary/10
        "
      >
        <Sparkles className="size-4" />
        AI Assistant
      </Button>
    </motion.div>
  );
};

export default AIAssistantTrigger;
