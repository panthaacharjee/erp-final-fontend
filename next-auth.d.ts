import NextAuth, { DefaultSession, DefaultUser } from "next-auth"

    declare module "next-auth" {
        interface Session {
            user: {
                id: string,
                userName:string,
                name: string,
                email: string,
                image: string,
                role:string,
                accessToken:string,
            } & DefaultSession["user"]
        }

        interface User extends DefaultUser {
            id: string
        }
    }