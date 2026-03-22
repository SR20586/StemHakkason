"use client";

import React, { useState, useEffect } from "react";

const LOADING_MESSAGES = [
  "因果律の整合性チェック中...",
  "多次元分岐点のスキャン中...",
  "時空管理局データベースへ照会中...",
  "非ユークリッド幾何学的妥当性を検証中...",
  "平行宇宙との同期処理中...",
  "事象の地平線を観測中...",
  "申請者の運命パラメータを計算中...",
  "量子もつれ状態の解析中...",
  "宇宙定数との整合性を確認中...",
  "時空連続体の歪み補正を適用中...",
];

export default function LoadingOverlay() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-overlay">
      <div className="loading-box">
        <div className="loading-spinner" />
        <div className="loading-text">{LOADING_MESSAGES[messageIndex]}</div>
        <div
          className="gov-note"
          style={{ marginTop: 16, fontSize: 11, color: "#888" }}
        >
          ※ 処理には通常5〜15秒程度かかります。
          <br />※ 画面を閉じると因果律が崩壊する恐れがあります。
        </div>
      </div>
    </div>
  );
}
