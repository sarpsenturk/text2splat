import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Text2Splat",
  description: "Convert text to 3D Gaussian splats",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
