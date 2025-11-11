import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./auth/config";



export async function getCurrentUser () {
  const session = await getServerSession(authOptions);
  return session?.user
}
export async function requireAuth(){
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  
  }
  return user;
}