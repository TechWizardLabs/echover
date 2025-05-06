import AppSidebar from "@/components/layouts/AppSidebar";
import { UserProvider } from "@/context/UserContext";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prismaConfig";
import { ReactNode } from "react";

interface PagesLayoutProps {
  children: ReactNode;
}

export default async function PagesLayout({ children }: PagesLayoutProps) {
  const session = await auth();

  let user;

  if (!session || !session.user.email) {
    user = null;
  } else {
    user = await prisma.user.findFirst({
      where: {
        email: session?.user?.email
      },
    });
  }

  return (
    <UserProvider initialUser={user}>
      <div className="flex min-h-screen bg-background">
        <AppSidebar />
        <main className="flex-1 md:ml-16 lg:ml-64 pt-4 pb-20 md:pb-4 px-4">
          {children}
        </main>
      </div>
    </UserProvider>
  );
}