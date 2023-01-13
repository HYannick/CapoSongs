import type { JwtToken } from "@/common/domain/JwtToken";

export const AuthorizationHeader = (token: JwtToken) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});