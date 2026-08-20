export function parseUserId(params: { id: string }): number {
  const userId = Number(params.id);
  if (!Number.isInteger(userId) || userId <= 0) {
    throw new Error("invalid user id");
  }
  return userId;
}
