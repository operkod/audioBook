export const formatStringEllipsis = (comment: string, length: number) => {
  if (comment != null) {
    if (comment.length <= length) return comment;
    return `${comment.slice(0, length)}\u2026`; // u2026 - "…"
  }
  return comment;
};
