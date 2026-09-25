import { memo } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { cn } from '@/shared/lib/utils';

interface Props {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const AIMessage = ({ role, content }: Props) => {
  const isUser = role === 'user';

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 6,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className={cn('mb-2 flex', isUser ? 'justify-end' : 'justify-start')}
    >
      <div
        className={cn(
          'max-w-[88%] rounded-2xl border px-2 py-2 text-xs leading-5',
          isUser
            ? 'rounded-br-md border-primary/10 bg-primary text-primary-foreground'
            : 'rounded-bl-md bg-card',
        )}
      >
        <div
          className={cn(
            'prose prose-xs max-w-none break-words dark:prose-invert',
            isUser && 'prose-p:text-primary-foreground',
          )}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
};

export default memo(AIMessage);
