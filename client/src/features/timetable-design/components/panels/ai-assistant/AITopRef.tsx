import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface AITopRefProps {
  hasMore: boolean;
  loadMore: () => Promise<void>;
}

const AITopRef = ({ hasMore, loadMore }: AITopRefProps) => {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const loadingRef = useRef(false);

  useEffect(() => {
    if (!inView || !hasMore || loadingRef.current) {
      return;
    }

    const load = async () => {
      loadingRef.current = true;

      try {
        await loadMore();
      } finally {
        loadingRef.current = false;
      }
    };

    load();
  }, [inView, hasMore, loadMore]);

  return <div ref={ref} className="h-px" />;
};

export default AITopRef;
