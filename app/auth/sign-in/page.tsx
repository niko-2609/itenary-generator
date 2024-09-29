"use client"
import { googleSignIn, signInMagicLink } from '@/app/actions/authActions'
import React, {useState, useTransition} from 'react'



function SignIn() { 
    const [loading, setLoading] = useState<boolean>(false)
    const [ isPending, startTransition] = useTransition()
    const handleSignIn = async () => {
        startTransition(() => {
            setLoading(isPending)
            googleSignIn()
        })
        setLoading(isPending)
    }


  return (
    <div>
      <form
      action={async (formData) => {
        await signInMagicLink(formData)
      }}
    >
      <input type="text" name="email" placeholder="Email" />
      <button type="submit">Signin with Resend</button>
    </form>
     {loading && <p>LOADING....</p>}
     {!loading && <button onClick={handleSignIn}>
        Sign in
     </button>}
    </div>
  )
}

export default SignIn
