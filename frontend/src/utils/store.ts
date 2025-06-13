import { create } from 'zustand'

interface UserState {
  isLoggedIn: boolean
  userId: string | null
  setAuthStatus: (isLoggedIn: boolean, userId?: string | null) => void
  logout: () => void
}

export const userStore = create<UserState>()((set) => ({
  isLoggedIn: false,
  userId: null,

  setAuthStatus: (isLoggedIn, userId = null) =>
    set({
      isLoggedIn,
      userId,
    }),

  logout: () =>
    set({
      isLoggedIn: false,
      userId: null,
    }),
}))
