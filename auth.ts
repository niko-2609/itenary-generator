import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/src/app/lib/db/db"

export const { handlers, auth, signIn, signOut } = NextAuth({
    pages: {
        signIn: "/auth/sign-in",
        error: "/error"
    },
    adapter: PrismaAdapter(db),
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,  // 30 days in seconds
    },
    ...authConfig,
    trustHost: true, // prevents using localhost in production, would use whatever is configured in NEXTAUTH_URL in env
    // events: {
    //     async linkAccount({ user }) {
    //         // once the user is signed in with OAuth provider,
    //         // this will update the emailVerified field for that user to the present/current date.
    //         await db.user.update({
    //             where: { id: user.id },
    //             data: { emailVerified: new Date() }
    //         })
    //     }
    // },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                };
            }
            return token
            //   // check if the user id exists in token, if no, return the token
            //   if (!token.sub) return token;

            //   // find if user present in token, exists in db 
            //   const existingUser = await getUserById(token.sub)

            //   // if no user is present, do nothing and return the token
            //   if (!existingUser) return token;

            //   // fetch the role value from db and add it in the token
            //   token.role = existingUser.role


            //   // default return 
            //   return token
        },
        async session({ session, token }) {

            console.log("Session:", session)
            console.log("Token:", token)

            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id as string
                }
            }
            // Adding user id(sub) from token in session
            //   if (token.sub && session.user) {
            //        session.user.id = token.sub
            //   }

            //   // Adding user "role" from token to session
            //   if (token.role && session.user) {
            //     session.user.role = token.role as UserRole
            //   }

            //   return session
        },
    },
})