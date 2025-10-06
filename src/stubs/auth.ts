export type User = null;
export function useAuth() {
  return {
    user: null as User,
    authLoading: false,
    signIn: async () => void 0,
    signOut: async () => void 0,
  };
}
