import Footer from "@/components/landing/Footer";
import Appbar from "@/components/landing/Navbar";
import { UserProvider } from "@/context/UserContext";
import prisma from "@/db/prisma";
import { auth } from "@/lib/auth";
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
        <Appbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
    </UserProvider>
  );
}