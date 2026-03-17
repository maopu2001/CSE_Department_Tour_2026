import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/Provider";
import Link from "next/link";
import { Toaster } from "sonner";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CSE Department Tour 2026",
  description:
    "CSE Department Tour 2026, Organized by Ovvudoy 07, Department of Computer Science and Engineering, Rangamati Science and Technology University.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans", geist.variable)}
    >
      <body className={inter.variable}>
        <Providers>{children}</Providers>

        <footer>
          <div className="border-t border-border py-2 text-center">
            <p className="text-sm text-muted-foreground font-sans tex-nowrap">
              &copy; {new Date().getFullYear()} | Made and Maintained by{" "}
              <Link
                className="text-primary hover:underline font-medium"
                href="https://github.com/maopu2001"
                target="_blank"
                rel="noopener noreferrer"
              >
                M. Aktaruzzaman Opu
              </Link>
              .
            </p>
          </div>
        </footer>
        <Toaster position="bottom-right" richColors closeButton />
      </body>
    </html>
  );
}
