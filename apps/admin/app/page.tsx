import { redirect } from "next/navigation"
import { getAdminSession } from "@/lib/auth"

export default async function AdminHomePage() {
  const session = await getAdminSession()
  redirect(session ? "/admin" : "/login")
}
