'use client'
/**
 *  Client Component - defined by 'use client', is prerendered to HTML still on server 
 */
import React from "react"
import dynamic from "next/dynamic"

// Disables prerendering from App component (made by Vite)
const App = dynamic(() => import('../../App'), {ssr: false})

export function ClientOnly() {
    return <App />
}