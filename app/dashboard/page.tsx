/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState, useTransition } from 'react'
import { signOutAction } from '../actions/authActions'

function Dashboard() {
  const [ loading, setLoading] = useState<any>(false)
  const [isPending, startTransition ] = useTransition()
  const handleSignOut = async () => {
    startTransition(() => {
        setLoading(isPending)
        signOutAction()
    })
    setLoading(isPending)
}
  return (
    <div>
      DASHBOARD

      <button style={{marginLeft: 20,}}
      onClick={handleSignOut}>
        Signout
      </button>
    </div>
  )
}

export default Dashboard
