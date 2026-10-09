import { memo, useState } from 'react';

import AIAssistantTrigger from './AIAssistantTrigger';
import AIAssistantPanel from './AIAssistantPanel';

const AIAssistant = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {!open && <AIAssistantTrigger onClick={() => setOpen(true)} />}

      {open && <AIAssistantPanel onClose={() => setOpen(false)} />}
    </>
  );
};

export default memo(AIAssistant);
