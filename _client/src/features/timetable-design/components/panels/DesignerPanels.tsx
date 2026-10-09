import { Panel } from '@xyflow/react';
import React, { memo } from 'react';
import GenerateSchedule from './GenerateSchedule';
import DesignerControls from './DesignerControls';
import TimetableTitle from './TimetableTitle';
import DesignerPalette from './DesignerPalette';
import TemplatePanel from './TemplatePanel';
import AIAssistant from './ai-assistant/AIAssistant';

const DesignerPanels = () => {
  return (
    <>
      <Panel position="top-left">
        <TimetableTitle />
      </Panel>

      <Panel position="top-center">
        <DesignerControls />
      </Panel>

      <Panel position="top-right">
        <div className="flex items-center gap-2">
          <GenerateSchedule />
          <TemplatePanel />
        </div>
      </Panel>

      <Panel position="top-left">
        <DesignerPalette />
      </Panel>

      <Panel position="bottom-right">
        <AIAssistant />
      </Panel>
    </>
  );
};

export default memo(DesignerPanels);
