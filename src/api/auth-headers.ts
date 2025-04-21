export const AuthorizationHeader = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
