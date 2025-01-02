import { Inter } from "next/font/google";
import { Metadata } from "next";
import Sidebar from "./components/layouts/sideBar/Sidebar";
import SessionLayout from "./SessionLayout";
import "../style/global.scss";
import styles from "./layout.module.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TraWeather",
  description: "Weather application",
  icons: {
    icon: "/weather-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionLayout>
          <div className={styles.container}>
            <div className={styles.sidebar}>
              <Sidebar />
            </div>

            <div className={`globalContent ${styles.content}`}>{children}</div>
          </div>
        </SessionLayout>
      </body>
    </html>
  );
}
