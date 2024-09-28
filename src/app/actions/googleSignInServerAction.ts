/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { signIn } from "@/auth"

export const googleSignIn = async () => {
    try {
        await signIn("google",
            {
                redirectTo:"/dashboard",
                redirect: true
            }
        )
    }catch (err: any) {
        throw err
    }
}