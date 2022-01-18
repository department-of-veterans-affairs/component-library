/**
 * Represents an input field value.
 *
 * Input fields need to have a `dirty` state that represents whether or not a user has touched it.
 * Without this state, it is extremely hard (impossible?) to write UI with required fields where
 * the initial empty state does not get marked as a distracting error.
 */
export function makeField(value, optionalDirty) {
  const dirty = optionalDirty === undefined ? false : optionalDirty;
  return { value, dirty };
}
