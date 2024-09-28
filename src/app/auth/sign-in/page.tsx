"use client"
import { googleSignIn } from '@/src/app/actions/googleSignInServerAction'
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
     {loading && <p>LOADING....</p>}
     {!loading && <button onClick={handleSignIn}>
        Sign in
     </button>}
    </div>
  )
}

export default SignIn
