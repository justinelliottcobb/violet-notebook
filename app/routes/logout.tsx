import { redirect } from "@remix-run/node";
import { logout } from "~/services/auth.server";

export async function loader({ request }: { request: Request }) {
  return logout(request);
}