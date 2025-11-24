import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"], // choose what you need
});



export const metadata:Metadata = {
  title: "Kanban App",
  description: "Kanban App Challenge",
  authors: [{ name: "Barrie Freyre" }],

  icons: {
    icon: "/assets/favicon-32x32.png",
  },

  other: {
    linkedin: "https://www.linkedin.com/in/barriefreyre/",
    github: "https://github.com/barriedirk",
    frontendmentor: "https://www.frontendmentor.io/profile/barriedirk",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Barrie Freyre",
              sameAs: [
                "https://www.linkedin.com/in/barriefreyre/",
                "https://github.com/barriedirk",
                "https://www.frontendmentor.io/profile/barriedirk",
              ],
            }),
          }}
        />
        <link rel="me" href="https://www.linkedin.com/in/barriefreyre/" />
        <link rel="me" href="https://github.com/barriedirk" />
        <link
          rel="me"
          href="https://www.frontendmentor.io/profile/barriedirk"
        />
      </head>
      <body className={plusJakarta.className}>
        {children}
      </body>
    </html>
  );
}
