import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FixPage | Web Quote Builder",
  description: "Estimate a web project and send an inquiry through one simple page.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
