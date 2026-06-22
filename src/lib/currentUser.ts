import { cookies } from "next/headers";
import { verifyToken } from "./auth";

export async function getCurrentUser() {
  const cookieStore =
    await cookies();

  const token =
    cookieStore.get(
      "citylens_token"
    )?.value;

  if (!token) {
    throw new Error(
      "Unauthorized"
    );
  }

  return verifyToken(token);
}