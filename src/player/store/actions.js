export function seekRelative(position) {
  return {
    type: 'SEEK_RELATIVE',
    payload: position
  };
}
