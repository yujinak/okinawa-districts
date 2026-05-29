import type { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Okinawa Districts',
    description: 'Explore Okinawa'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        {/* <head>
            <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Serif+JP:wght@400;700;900&family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
        </head> */}
        <body>
            {children}
        </body>
    </html>
    );
}