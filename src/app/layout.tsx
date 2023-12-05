import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/providers/themeProvider";
import Header from "@/components/header/Header";
import SideLayout from "@/components/side/SideLayout";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { Toaster } from "react-hot-toast";
import Providers from "@/providers/Providers";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });

export const metadata: Metadata = {
  title: "CORE AI",
  description: "AI APPLICATION",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>
          <EdgeStoreProvider>
            <ThemeProvider>
              <Header>
                <SideLayout>{children}</SideLayout>
              </Header>
              <Toaster />
              {/* <SheetRightSideFloatingButton /> */}
            </ThemeProvider>
          </EdgeStoreProvider>
        </Providers>
      </body>
    </html>
  );
}
