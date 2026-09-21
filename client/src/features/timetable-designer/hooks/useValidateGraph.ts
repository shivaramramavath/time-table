import { useReactFlow } from '@xyflow/react';
import { useCallback } from 'react';

const REQUIRED_NODE_TYPES = ['institution', 'program', 'academic-year', 'section'] as const;

const REQUIRED_CONNECTIONS = [
  ['institution', 'program'],
  ['program', 'academic-year'],
  ['academic-year', 'section'],
] as const;

type ValidationResult = {
  valid: boolean;
  message: string;
};

const useValidateGraph = () => {
  const { getNodes, getEdges } = useReactFlow();

  const validateGraph = useCallback((): ValidationResult => {
    const nodes = getNodes();
    const edges = getEdges();

    // -----------------------------------------
    // 1. Required node types
    // -----------------------------------------

    for (const type of REQUIRED_NODE_TYPES) {
      const exists = nodes.some((node) => node.type === type);

      if (!exists) {
        return {
          valid: false,
          message: `${type} node is required.`,
        };
      }
    }

    // -----------------------------------------
    // 2. Every node must have data
    // -----------------------------------------

    const invalidNode = nodes.find(
      (node) => !node.data || typeof node.data !== 'object' || Object.keys(node.data).length === 0,
    );

    if (invalidNode) {
      return {
        valid: false,
        message: `"${invalidNode.type}" node has no data.`,
      };
    }

    // -----------------------------------------
    // 3. Validate edges
    // -----------------------------------------

    const nodeIds = new Set(nodes.map((node) => node.id));

    for (const edge of edges) {
      if (!edge.source || !edge.target) {
        return {
          valid: false,
          message: `Edge "${edge.id}" is invalid.`,
        };
      }

      if (!nodeIds.has(edge.source)) {
        return {
          valid: false,
          message: `Edge "${edge.id}" has an invalid source.`,
        };
      }

      if (!nodeIds.has(edge.target)) {
        return {
          valid: false,
          message: `Edge "${edge.id}" has an invalid target.`,
        };
      }

      if (edge.source === edge.target) {
        return {
          valid: false,
          message: `A node cannot connect to itself.`,
        };
      }
    }

    // -----------------------------------------
    // 4. Every node must be connected
    // -----------------------------------------

    const connectedNodeIds = new Set<string>();

    for (const edge of edges) {
      connectedNodeIds.add(edge.source);
      connectedNodeIds.add(edge.target);
    }

    const disconnectedNode = nodes.find((node) => !connectedNodeIds.has(node.id));

    if (disconnectedNode) {
      return {
        valid: false,
        message: `"${disconnectedNode.type}" node is not connected.`,
      };
    }

    // -----------------------------------------
    // 5. Validate hierarchy
    // -----------------------------------------

    for (const [parentType, childType] of REQUIRED_CONNECTIONS) {
      const parentNodes = nodes.filter((node) => node.type === parentType);

      const childNodes = nodes.filter((node) => node.type === childType);

      // ---------------------------------------
      // Parent -> Child
      //
      // Every parent must have at least one
      // required child.
      // ---------------------------------------

      for (const parent of parentNodes) {
        const hasChild = edges.some((edge) => {
          if (edge.source !== parent.id) {
            return false;
          }

          const child = nodes.find((node) => node.id === edge.target);

          return child?.type === childType;
        });

        if (!hasChild) {
          return {
            valid: false,
            message: `"${parent.data?.label ?? parent.type}" must have at least one ${childType}.`,
          };
        }
      }

      // ---------------------------------------
      // Child -> Parent
      //
      // Every child must have the correct
      // parent.
      // ---------------------------------------

      for (const child of childNodes) {
        const hasParent = edges.some((edge) => {
          if (edge.target !== child.id) {
            return false;
          }

          const parent = nodes.find((node) => node.id === edge.source);

          return parent?.type === parentType;
        });

        if (!hasParent) {
          return {
            valid: false,
            message: `"${child.data?.label ?? child.type}" must be connected to ${parentType}.`,
          };
        }
      }
    }

    // -----------------------------------------
    // 6. Valid
    // -----------------------------------------

    return {
      valid: true,
      message: 'Graph is valid.',
    };
  }, [getNodes, getEdges]);

  return {
    validateGraph,
  };
};

export default useValidateGraph;
