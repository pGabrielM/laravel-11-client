import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { NextAuthOptions, Session, getServerSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email address" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const csrfRespoonse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`, {
          method: "GET",
        })

        const setCookieHeader = csrfRespoonse.headers.get("set-cookie")
        const cookies = setCookieHeader?.split(", ")
        let sessionKey = null
        let xsrfToken = null

        for (const cookie of cookies!) {
          if (cookie.startsWith("laravel_session=")) {
            sessionKey = cookie.split("=")[1]
          } else if (cookie.startsWith("XSRF-TOKEN=")) {
            xsrfToken = cookie.split("=")[1]
          }

          if (sessionKey && xsrfToken) {
            break
          }
        }

        const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })

        const user = await userResponse.json()

        if (userResponse.ok && user) {
          return user
        }

        throw new Error(user.message)
      }
    })

  ],
  callbacks: {
    jwt: async ({ user, token }) => {
      return { ...user, ...token };
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      session.user.token = token.token;

      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
}