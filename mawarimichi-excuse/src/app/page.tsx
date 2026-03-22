"use client";

import React, { useState } from "react";
import ApplicationForm from "@/components/ApplicationForm";
import CertificatePreview from "@/components/CertificatePreview";
import LoadingOverlay from "@/components/LoadingOverlay";
import { ExcuseData, FormInput } from "@/types";

export default function Home() {
  const [formData, setFormData] = useState<FormInput>({
    applicantName: "",
    incident: "",
    mundaneReason: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [excuseData, setExcuseData] = useState<ExcuseData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof FormInput, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setExcuseData(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(
          errBody.error || `サーバーエラーが発生しました (${res.status})`
        );
      }

      const data: ExcuseData = await res.json();
      setExcuseData(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "不明なエラーが発生しました。時空の歪みが原因かもしれません。"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setExcuseData(null);
    setError(null);
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* ローディング */}
      {isLoading && <LoadingOverlay />}

      {/* ====== ヘッダー ====== */}
      <header
        style={{
          background: "linear-gradient(to bottom, #e6f2ff, #cce0ff)",
          borderBottom: "3px solid #336699",
          padding: "12px 0",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontSize: 11, color: "#666", marginBottom: 2 }}>
                全宇宙まわりみち機構・時空管理局
              </div>
              <h1
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#1a3d66",
                  margin: 0,
                  letterSpacing: 2,
                }}
              >
                言い訳証明書 電子申請システム
              </h1>
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#666",
                textAlign: "right",
                lineHeight: 1.6,
              }}
            >
              【システムVer 8.88.∞】
              <br />
              稼働次元数：88
            </div>
          </div>
        </div>
      </header>

      {/* サブナビゲーション */}
      <nav
        style={{
          background: "#336699",
          padding: "4px 0",
          borderBottom: "1px solid #1a3d66",
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            padding: "0 16px",
            display: "flex",
            gap: 0,
          }}
        >
          {["トップ", "申請", "お知らせ", "よくある質問", "お問い合わせ"].map(
            (label, i) => (
              <span
                key={label}
                style={{
                  padding: "4px 16px",
                  fontSize: 12,
                  color: i === 1 ? "#fff" : "#cde",
                  background: i === 1 ? "#1a3d66" : "transparent",
                  cursor: "pointer",
                  borderRight: "1px solid #5588aa",
                }}
              >
                {label}
              </span>
            )
          )}
        </div>
      </nav>

      {/* ====== メインコンテンツ ====== */}
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
        {/* パンくずリスト */}
        <div style={{ fontSize: 11, color: "#666", marginBottom: 16 }}>
          <span style={{ color: "#336699", cursor: "pointer" }}>トップ</span>
          {" ＞ "}
          <span style={{ color: "#336699", cursor: "pointer" }}>申請一覧</span>
          {" ＞ "}
          <span>言い訳証明書の申請</span>
        </div>

        {/* ページタイトル */}
        <h2
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#1a3d66",
            borderLeft: "4px solid #336699",
            paddingLeft: 12,
            marginBottom: 8,
          }}
        >
          言い訳証明書（遅延事象等に関する申立書）の申請
        </h2>
        <div className="gov-note" style={{ marginBottom: 24 }}>
          ※ このページでは、遅刻・遅延・未提出等の世俗的事象について、
          宇宙的不可抗力による正当事由の認定申請を行うことができます。
          <br />※ 申請は1回につき1件です。複数の事象がある場合は個別に申請してください。
        </div>

        {/* エラー表示 */}
        {error && (
          <div
            style={{
              background: "#fff0f0",
              border: "2px solid #cc3333",
              padding: "16px",
              marginBottom: 24,
              fontSize: 14,
              color: "#cc3333",
            }}
          >
            <strong>【エラー】</strong> {error}
            <div className="gov-note" style={{ color: "#999", marginTop: 8 }}>
              ※ 時空管理局のサーバーに接続できませんでした。
              しばらくしてから再度お試しください。
            </div>
          </div>
        )}

        {/* === 申請フォーム or 証明書 === */}
        {!excuseData ? (
          <ApplicationForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        ) : (
          <div>
            <CertificatePreview
              data={excuseData}
              applicantName={formData.applicantName}
            />

            {/* 申請しなおす */}
            <div
              style={{
                textAlign: "center",
                marginTop: 16,
                marginBottom: 32,
              }}
            >
              <button
                type="button"
                className="gov-button gov-button-gray"
                onClick={handleReset}
                style={{ padding: "8px 32px" }}
              >
                新たな申請を行う
              </button>
            </div>
          </div>
        )}
      </main>

      {/* ====== フッター ====== */}
      <footer
        style={{
          background: "#e6f2ff",
          borderTop: "2px solid #336699",
          padding: "16px 0",
          marginTop: 48,
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            padding: "0 16px",
            fontSize: 11,
            color: "#666",
            textAlign: "center",
            lineHeight: 2,
          }}
        >
          全宇宙まわりみち機構・時空管理局
          <br />
          〒∞-8888 第88次元 因果律大通り1-1-1 時空庁舎8F
          <br />
          TEL: 0∞-XXXX-XXXX（平日 9:00〜17:00 ※時間の流れが存在する次元に限る）
          <br />
          <span style={{ color: "#999" }}>
            Copyright &copy; 全宇宙まわりみち機構. All rights reserved across
            88 dimensions.
          </span>
        </div>
      </footer>
    </div>
  );
}
