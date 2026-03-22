"use client";

import React from "react";
import { FormInput } from "@/types";

interface ApplicationFormProps {
  formData: FormInput;
  onChange: (field: keyof FormInput, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export default function ApplicationForm({
  formData,
  onChange,
  onSubmit,
  isLoading,
}: ApplicationFormProps) {
  return (
    <form onSubmit={onSubmit}>
      {/* セクションヘッダ */}
      <div
        style={{
          background: "linear-gradient(to right, #336699, #5b9bd5)",
          color: "#fff",
          padding: "8px 16px",
          fontSize: "14px",
          fontWeight: "bold",
          marginBottom: "0",
          borderBottom: "2px solid #1a3d66",
        }}
      >
        ■ 申請内容入力
      </div>

      <table className="gov-table">
        <tbody>
          {/* 申請者氏名 */}
          <tr>
            <th>
              申請者氏名
              <span style={{ color: "#cc3333", marginLeft: 4 }}>※必須</span>
            </th>
            <td>
              <input
                type="text"
                value={formData.applicantName}
                onChange={(e) => onChange("applicantName", e.target.value)}
                placeholder="（例）山田 太郎"
                required
              />
              <div className="gov-note">
                ※ 本名でなくても構いません。宇宙的にはすべての名前が仮のものです。
              </div>
            </td>
          </tr>

          {/* 遅延/未提出の事象 */}
          <tr>
            <th>
              遅延/未提出の事象
              <span style={{ color: "#cc3333", marginLeft: 4 }}>※必須</span>
            </th>
            <td>
              <input
                type="text"
                value={formData.incident}
                onChange={(e) => onChange("incident", e.target.value)}
                placeholder="（例）講義に5分遅刻した、レポート提出が3日遅れた"
                required
              />
              <div className="gov-note">
                ※
                具体的な時間や対象を記載すると、より精密な時空因果律の解析が行われます。
              </div>
            </td>
          </tr>

          {/* 世俗的な理由 */}
          <tr>
            <th>
              世俗的な理由（表向き）
              <span style={{ color: "#cc3333", marginLeft: 4 }}>※必須</span>
            </th>
            <td>
              <textarea
                value={formData.mundaneReason}
                onChange={(e) => onChange("mundaneReason", e.target.value)}
                placeholder="（例）寝坊した、電車を乗り間違えた、ゲームに夢中になっていた"
                required
              />
              <div className="gov-note">
                ※
                ここに記載された理由は、審査の結果「真の宇宙的理由」へと昇格されます。
                <br />※
                正直に書いてください。嘘をつくと因果律が乱れます（当局は責任を負いません）。
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* 注意書き */}
      <div
        style={{
          background: "#fff8e6",
          border: "1px solid #e6d9a0",
          padding: "12px 16px",
          margin: "16px 0",
          fontSize: "11px",
          color: "#666",
          lineHeight: 1.8,
        }}
      >
        <strong style={{ color: "#996600" }}>
          【申請にあたっての注意事項】
        </strong>
        <br />
        ※ 本システムは「全宇宙まわりみち機構・時空管理局」が運営する
        正規の電子申請窓口です。
        <br />
        ※
        生成された証明書は全宇宙88次元において法的拘束力を有します（3次元を除く）。
        <br />
        ※ 申請内容に虚偽がある場合、時空の歪みが発生する可能性があります。
        <br />※ 処理にはAIによる因果律演算が含まれるため、数秒〜十数秒かかる場合があります。
      </div>

      {/* 送信ボタン */}
      <div style={{ textAlign: "center", margin: "24px 0" }}>
        <button
          type="submit"
          className="gov-button"
          disabled={isLoading}
          style={{
            fontSize: "16px",
            padding: "12px 48px",
            opacity: isLoading ? 0.5 : 1,
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          申請する（因果律解析を開始）
        </button>
        <div className="gov-note" style={{ marginTop: 8 }}>
          ※ 「申請する」ボタンを押すと、AI因果律演算エンジンによる解析が開始されます。
        </div>
      </div>
    </form>
  );
}
