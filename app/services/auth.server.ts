import { createCookieSessionStorage, redirect } from "@remix-run/node";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const sessionSecret = process.env.SESSION_SECRET || "default-secret-change-me";

const storage = createCookieSessionStorage({
  cookie: {
    name: "VN_session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    httpOnly: true,
  },
});

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await storage.getSession();
  const token = jwt.sign({ userId }, sessionSecret, { expiresIn: "30d" });
  session.set("token", token);
  
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

export async function getUserFromSession(request: Request) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  
  if (!token) return null;
  
  try {
    const payload = jwt.verify(token, sessionSecret) as { userId: string };
    return payload.userId;
  } catch {
    return null;
  }
}

export async function requireAuth(request: Request) {
  const userId = await getUserFromSession(request);
  if (!userId) {
    throw redirect("/login");
  }
  return userId;
}

export async function logout(request: Request) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}