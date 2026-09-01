import type { DesignerGraphState } from "../designer.state.js";
import { GraphStatus } from "../types.js";

import { nodeService } from "#features/timetable-designer/node/node.service.js";
import { edgeService } from "#features/timetable-designer/edge/edge.service.js";
import { facultyService } from "#features/timetable-designer/faculty/faculty.service.js";
import { subjectService } from "#features/timetable-designer/subject/subject.service.js";
import { roomService } from "#features/timetable-designer/room/room.service.js";

export async function retrieveNode(state: DesignerGraphState) {
  const { designerId, intent } = state;

  if (!intent) {
    return {
      retrieval: null,
      status: GraphStatus.RETRIEVING,
    };
  }

  const entities = intent.entities ?? [];

  const retrieval: Record<string, unknown> = {};

  /*
   * Retrieve only the entities identified by analyze.
   *
   * Promise.all keeps independent queries concurrent.
   */

  const tasks: Promise<void>[] = [];

  if (entities.includes("node")) {
    tasks.push(
      nodeService.getAll(designerId).then((nodes) => {
        retrieval.nodes = nodes;
      }),
    );
  }

  if (entities.includes("edge")) {
    tasks.push(
      edgeService.getAll(designerId).then((edges) => {
        retrieval.edges = edges;
      }),
    );
  }

  if (entities.includes("faculty")) {
    tasks.push(
      facultyService.getAll(designerId).then((faculties) => {
        retrieval.faculties = faculties;
      }),
    );
  }

  if (entities.includes("subject")) {
    tasks.push(
      subjectService.getAll(designerId).then((subjects) => {
        retrieval.subjects = subjects;
      }),
    );
  }

  if (entities.includes("room")) {
    tasks.push(
      roomService.getAll(designerId).then((rooms) => {
        retrieval.rooms = rooms;
      }),
    );
  }

  await Promise.all(tasks);

  return {
    retrieval,
    status: GraphStatus.RETRIEVING,
  };
}
