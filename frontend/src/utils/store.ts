import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { jwtDecode } from 'jwt-decode'

interface TokenData {
  token: string | null
}

interface JwtPayload {
  id: string
}

interface UserState {
  tokenData: TokenData
  setTokenData: (data: TokenData) => void
  isLoggedIn: boolean
  userId: string | null
  logout: () => void
}

export const userStore = create<UserState>()(
  persist(
    (set) => ({
      tokenData: { token: null },
      isLoggedIn: false,
      userId: null,

      setTokenData: (data) => {
        try {
          const decoded = jwtDecode<JwtPayload>(data.token!)
          set({
            tokenData: data,
            isLoggedIn: true,
            userId: decoded.id,
          })
        } catch (error) {
          console.error('Invalid token:', error)
          set({ isLoggedIn: false, userId: null, tokenData: { token: null } })
        }
      },

      logout: () =>
        set({
          isLoggedIn: false,
          userId: null,
          tokenData: { token: null },
        }),
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ tokenData: state.tokenData }),
      onRehydrateStorage: () => (state) => {
        // 🔁 Re-derive userId and isLoggedIn when rehydrating
        const token = state?.tokenData?.token
        if (token) {
          try {
            jwtDecode<JwtPayload>(token)
            state?.setTokenData({ token })
          } catch (e) {
            console.error("Failed to decode token on rehydrate:", e)
          }
        }
      }
    }
  )
)

