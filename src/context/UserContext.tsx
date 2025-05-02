"use client";

import { Provider } from "@prisma/client"
import { createContext, ReactNode, useContext, useState } from "react"

type User = {
  id: string
  name: string | null
  email: string | null
  image: string | null
  provider: Provider
}

type UserContextType = {
  user: User | null
  setUser: (user: User | null) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ initialUser, children }: { initialUser: User | null; children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(initialUser)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
