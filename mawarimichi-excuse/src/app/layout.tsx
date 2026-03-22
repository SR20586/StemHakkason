import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "全宇宙まわりみち機構｜言い訳証明書 電子申請システム",
  description:
    "あなたの遅刻・未提出は、多次元宇宙の均衡を守るための英雄的行動であったことを公的に証明します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
