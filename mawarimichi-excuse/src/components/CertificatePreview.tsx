"use client";

import React, { useRef } from "react";
import { ExcuseData } from "@/types";

interface CertificatePreviewProps {
  data: ExcuseData;
  applicantName: string;
}

export default function CertificatePreview({
  data,
  applicantName,
}: CertificatePreviewProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  const dateStr = `宇宙暦 ${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;

  const handleDownload = async () => {
    if (!certificateRef.current) return;

    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: "#faf6ee",
        useCORS: true,
        logging: false,
      });

      const link = document.createElement("a");
      link.download = `言い訳証明書_${applicantName}_${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, "0")}${today.getDate().toString().padStart(2, "0")}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("画像生成に失敗しました:", err);
      alert("画像の生成に失敗しました。ブラウザを変えてお試しください。");
    }
  };

  return (
    <div>
      {/* セクションヘッダ */}
      <div
        style={{
          background: "linear-gradient(to right, #339966, #66cc99)",
          color: "#fff",
          padding: "8px 16px",
          fontSize: "14px",
          fontWeight: "bold",
          marginBottom: "16px",
          borderBottom: "2px solid #1a6644",
        }}
      >
        ■ 証明書プレビュー（審査結果）
      </div>

      <div className="gov-note" style={{ marginBottom: 12 }}>
        ※ 以下の証明書は、全宇宙まわりみち機構・時空管理局の厳正な審査を経て発行されたものです。
        <br />
        ※ 3次元空間における法的効力はありません。あらかじめご了承ください。
      </div>

      {/* 証明書本体 */}
      <div ref={certificateRef} className="certificate-area">
        {/* 文書番号 */}
        <div className="certificate-ref">{data.reference_number}</div>

        {/* タイトル */}
        <div className="certificate-title">{data.title}</div>

        {/* 件名 */}
        <div className="certificate-subject">{data.subject}</div>

        {/* 申請者 */}
        <div style={{ fontSize: 13, marginBottom: 16, color: "#444" }}>
          申請者：{applicantName} 殿
        </div>

        {/* 本文 */}
        <div className="certificate-content">{data.content}</div>

        {/* 認定ランク */}
        <div className="certificate-rank">{data.rank}</div>

        {/* 日付・発行者 */}
        <div className="certificate-date">{dateStr}</div>
        <div className="certificate-issuer">
          全宇宙まわりみち機構
          <br />
          時空管理局 局長　次元 太郎
        </div>

        {/* 角印 */}
        <div className="hanko-stamp">
          時空
          管理
          局印
        </div>
      </div>

      {/* ダウンロードボタン */}
      <div style={{ textAlign: "center", margin: "24px 0" }}>
        <button
          type="button"
          className="gov-button gov-button-green"
          onClick={handleDownload}
          style={{ fontSize: "16px", padding: "12px 48px" }}
        >
          証拠を保存する（画像ダウンロード）
        </button>
        <div className="gov-note" style={{ marginTop: 8 }}>
          ※ 証明書をPNG画像として保存します。SNSへの投稿にもご利用いただけます。
          <br />※ ただし本証明書を公的機関に提出し却下された場合、当局は一切の責任を負いません。
        </div>
      </div>
    </div>
  );
}
