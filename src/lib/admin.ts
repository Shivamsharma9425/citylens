import { getCurrentUser } from "./currentUser";

export async function requireAdmin() {
  const user: any =
    await getCurrentUser();

  if (user.role !== "ADMIN") {
    throw new Error(
      "Unauthorized"
    );
  }

  return user;
}