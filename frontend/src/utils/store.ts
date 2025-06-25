import { create } from 'zustand'

interface UserState {
  isLoggedIn: boolean
  userId: string | null
  userFirstName: string | null
  userLastName: string | null
  userEmail: string | null
  userIsVerified: string | null
  setAuthStatus: (isLoggedIn: boolean, userId?: string | null, userFirstName?: string | null, userLastName?: string | null, userEmail?: string | null, userIsVerified?: string | null) => void
  logout: () => void
}

export const userStore = create<UserState>()((set) => ({
  isLoggedIn: false,
  userId: null,
  userFirstName: null,
  userLastName: null,
  userEmail: null,
  userIsVerified: null,

  setAuthStatus: (isLoggedIn, userId = null, userFirstName = null, userLastName = null, userEmail = null, userIsVerified = null) =>
    set({
      isLoggedIn,
      userId,
      userFirstName,
      userLastName,
      userEmail,
      userIsVerified
    }),

  logout: () =>
    set({
      isLoggedIn: false,
      userId: null,
      userFirstName: null,
      userLastName: null,
      userEmail: null,
      userIsVerified: null
    }),
}))
