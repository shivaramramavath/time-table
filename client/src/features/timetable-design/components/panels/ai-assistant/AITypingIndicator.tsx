import { motion } from 'framer-motion';

const AITypingIndicator = () => {
  return (
    <div className="flex items-center gap-2 py-2">
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((item) => (
          <motion.span
            key={item}
            animate={{
              opacity: [0.3, 1, 0.3],
              y: [0, -2, 2, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: item * 0.15,
            }}
            className="size-1.5 rounded-full bg-muted-foreground"
          />
        ))}
      </div>
    </div>
  );
};

export default AITypingIndicator;
