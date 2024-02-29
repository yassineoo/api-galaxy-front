import { AuthProviderButton } from "@/components/login/AuthProviderButton"
import { getCurrentUser } from "@/lib/session"
export default async function Home(){
  const session = await getCurrentUser()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AuthProviderButton provider={{
      name: "google",
      color: "bg-blue-500 text-white",
      logo: "/icons/google.svg",
    }} />
    </main>
  )
}
