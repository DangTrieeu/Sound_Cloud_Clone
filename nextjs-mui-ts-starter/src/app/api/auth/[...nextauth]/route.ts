import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import {AuthOptions} from "next-auth"
import { sendRequest } from "@/utils/api"
import { JWT } from "next-auth/jwt"


export const authOptions: AuthOptions = {
    secret: process.env.NO_SECRET,
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, user, account, profile, trigger })  {
      if(trigger==="signIn" && account?.provider==="github")
      {
          const getJWT = await sendRequest<IBackendRes<JWT>>(
            {
              url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/social-media`,
              method: "POST",
              body: { type: "github", username: user.email }
            }
          )
          if(getJWT.data){
            token.access_token = getJWT.data.access_token;
            token.refresh_token = getJWT.data.refresh_token;
            token.user = getJWT.data.user;
          }

      }
    return token;
  },
    session({ session, token, user }) {
      if(token){
        session.access_token = token.access_token;
        session.refresh_token = token.refresh_token;
        session.user = token.user;
      }

      return session;
    }
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }