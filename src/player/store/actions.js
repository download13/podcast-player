export function seekRelative(position) {
  return {
    type: 'SEEK_RELATIVE',
    payload: position
  };
}

export function seekToPosition(position) {
  return {
    type: 'SEEK_TO_POSITION',
    payload: position
  };
}
