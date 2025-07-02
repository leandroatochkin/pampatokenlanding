import { create } from 'zustand'

interface UserState {
  isLoggedIn: boolean
  userId: string | null
  userFirstName: string | null
  userLastName: string | null
  userEmail: string | null
  userIsVerified: string | null
  emailVerified: string | null
  setAuthStatus: (isLoggedIn: boolean, userId?: string | null, userFirstName?: string | null, userLastName?: string | null, userEmail?: string | null, userIsVerified?: string | null, emailVerified?: string | null) => void
  logout: () => void
}

export const userStore = create<UserState>()((set) => ({
  isLoggedIn: false,
  userId: null,
  userFirstName: null,
  userLastName: null,
  userEmail: null,
  userIsVerified: null,
  emailVerified: null,

  setAuthStatus: (isLoggedIn, userId = null, userFirstName = null, userLastName = null, userEmail = null, userIsVerified = null, emailVerified = null) =>
    set({
      isLoggedIn,
      userId,
      userFirstName,
      userLastName,
      userEmail,
      userIsVerified,
      emailVerified
    }),

  logout: () =>
    set({
      isLoggedIn: false,
      userId: null,
      userFirstName: null,
      userLastName: null,
      userEmail: null,
      userIsVerified: null,
      emailVerified: null
    }),
}))
