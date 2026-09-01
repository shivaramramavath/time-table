import { messageService } from "#features/timetable-designer/message/message.service.js";
import type { DesignerGraphState } from "../designer.state.js";
import { GraphStatus } from "../types.js";

export async function loadContextNode(state: DesignerGraphState) {
  const { designerId } = state;

  const messages = await messageService.get(designerId, 1);

  return {
    context: {
      messages,
    },

    status: GraphStatus.LOADING_CONTEXT,
  };
}
