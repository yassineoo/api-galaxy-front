import { getCurrentUser } from "@/lib/session";

export default async function Home() {
  const session =await getCurrentUser()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello world !!!</h1>
    </main>
  );
}
