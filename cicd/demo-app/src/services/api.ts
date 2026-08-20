export type UserSummary = {
  id: number;
  name: string;
};

const users: Record<number, string> = {
  1: "Dat",
  2: "Hoang",
};

export function fetchUserSummary(id: number): UserSummary {
  const name = users[id];
  if (!name) {
    throw new Error(`user ${id} not found`);
  }
  return { id, name };
}

export function listUserIds(): number[] {
  return Object.keys(users).map(Number);
}
