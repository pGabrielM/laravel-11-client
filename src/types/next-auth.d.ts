import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string
      name: string
      email: string
      email_verified_at: string
      password: string
      token: string
    } & DefaultSession["user"]
  }
  interface JWT {
    user?: {
      id: string
      name: string
      email: string
      email_verified_at: string
      password: string
      token: string
    };
  }
}