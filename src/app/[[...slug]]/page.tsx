/**
 *  Server Component - prerenders into static asset when 'next build'
 */
import '../../index.css'
import { ClientOnly } from './client'

/**
 * Makes app SPA (single route)
 * @returns all to same route
 */
export function generateStaticParams() {
    return [{ slug: ['']}]
}

export default function Page() {
    return <ClientOnly />
}