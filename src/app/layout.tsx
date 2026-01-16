import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata: Metadata = {
  title: {
    default: "Y-folio",
    template: "%s | Y-folio",
  },
  description: "Portfolio platform connecting students and recruiters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className=""
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
