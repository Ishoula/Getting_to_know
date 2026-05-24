import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import FloatingStars from "@/components/FloatingStars";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background relative isolate">
      <FloatingStars />
      <DashboardNav user={session.user} />
      <main className="container mx-auto px-4 py-8 relative z-10">
        {children}
      </main>
    </div>
  );
}
