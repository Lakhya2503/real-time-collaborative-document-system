export const applyOperation = (content, actions) => {
  if (typeof content !== "string") {
    content = content?.text || "";
  }
  let result = content;

  // Sort actions in reverse order of position so index updates don't shift prior indices
  const sortedActions = [...actions].sort((a, b) => b.position - a.position);

  for (const action of sortedActions) {
    if (action.type === "insert") {
      result =
        result.slice(0, action.position) +
        action.text +
        result.slice(action.position);
    } else if (action.type === "delete") {
      result =
        result.slice(0, action.position) +
        result.slice(action.position + action.length);
    }
  }
  return result;
};

export const transformAction = (actionA, actionB) => {
  const bPrime = { ...actionB };

  if (actionA.type === "insert" && actionB.type === "insert") {
    if (actionA.position < actionB.position) {
      bPrime.position += actionA.text.length;
    } else if (actionA.position === actionB.position) {
      // Tie-breaker: shift actionB if we assign it lower priority
      bPrime.position += actionA.text.length;
    }
  } else if (actionA.type === "insert" && actionB.type === "delete") {
    if (actionA.position <= actionB.position) {
      bPrime.position += actionA.text.length;
    } else if (actionA.position < actionB.position + actionB.length) {
      // Insert is inside deleted range: expand delete length
      bPrime.length += actionA.text.length;
    }
  } else if (actionA.type === "delete" && actionB.type === "insert") {
    if (actionA.position + actionA.length <= actionB.position) {
      bPrime.position -= actionA.length;
    } else if (actionA.position < actionB.position) {
      // Insert inside deleted range: shift insertion position to start of deletion
      bPrime.position = actionA.position;
    }
  } else if (actionA.type === "delete" && actionB.type === "delete") {
    if (actionA.position + actionA.length <= actionB.position) {
      bPrime.position -= actionA.length;
    } else if (actionA.position >= actionB.position + actionB.length) {
      // No overlap, delete A is after delete B
    } else {
      // Overlap: adjust range
      const overlapStart = Math.max(actionA.position, actionB.position);
      const overlapEnd = Math.min(actionA.position + actionA.length, actionB.position + actionB.length);
      const overlapLength = overlapEnd - overlapStart;

      bPrime.length -= overlapLength;
      if (actionA.position < actionB.position) {
        bPrime.position -= (actionB.position - actionA.position);
      }
    }
  }

  return bPrime;
};

export const transformOperations = (actionsA, actionsB) => {
  let transformedB = [...actionsB];
  for (const actionA of actionsA) {
    transformedB = transformedB.map((actionB) => transformAction(actionA, actionB));
  }
  return transformedB.filter((action) => action.type !== "delete" || action.length > 0);
};
