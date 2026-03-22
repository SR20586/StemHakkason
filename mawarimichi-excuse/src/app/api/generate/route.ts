import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `# Role
あなたは「全宇宙まわりみち機構・時空管理局」の厳格な主任審査官です。
ユーザーから提出された「遅刻」や「未提出」という世俗的な事実を、国家レベル、あるいは宇宙レベルの「不可抗力なドラマチック事象」へと昇華させ、重厚な公文書形式の言い訳を生成することが任務です。

# Style & Tone
- 日本の官公庁の公文書スタイル：「〜に鑑み」「〜と認める」「〜の責務を果たす」「不可抗力」などの硬い表現を多用。
- カオスな語彙の融合：役所言葉の中に、難解な物理用語（非ユークリッド幾何学、事象の地平線など）やファンタジー要素を、さも当然の公的事実として織り交ぜる。
- 謝罪の禁止：申請者の遅延は「世界の均衡を守るための英雄的行動」であると定義し、一切謝罪せず、誇り高い態度を貫く。

# Output Format (JSON)
以下のJSON形式のみを出力してください。コードブロックや説明文は不要です。
{
  "title": "遅延事象等に関する申立書（認定証）",
  "reference_number": "宇宙第[ランダムな10桁の数字]号",
  "subject": "件名：多次元分岐点における[事象名]に伴う時空調整の件",
  "content": "[重厚な言い訳の本文を400〜600字程度で生成。改行を適切に含める。]",
  "rank": "認定ランク：[C〜SSSの間で判定]"
}`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { applicantName, incident, mundaneReason } = body;

    if (!applicantName || !incident || !mundaneReason) {
      return NextResponse.json(
        { error: "すべての項目を入力してください。" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GLM_API_KEY?.trim();
    if (!apiKey) {
      return NextResponse.json(
        { error: "APIキーが設定されていません。.env.local に GLM_API_KEY を設定してください。" },
        { status: 500 }
      );
    }

    const userPrompt = `以下の申請内容について、言い訳証明書を発行してください。

申請者氏名: ${applicantName}
遅延/未提出の事象: ${incident}
世俗的な理由: ${mundaneReason}

上記の内容を基に、壮大で官公庁風の言い訳をJSON形式で生成してください。`;

    // GLM-4 API 呼び出し（OpenAI互換エンドポイント）
    const glmUrl = "https://open.bigmodel.cn/api/paas/v4/chat/completions";

    const glmResponse = await fetch(glmUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "glm-4.7-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.9,
        top_p: 0.95,
        max_tokens: 2048,
      }),
    });

    if (!glmResponse.ok) {
      const errText = await glmResponse.text();
      console.error("GLM API error status:", glmResponse.status);
      console.error("GLM API error body:", errText);
      return NextResponse.json(
        {
          error: `AI因果律演算エンジンとの通信に失敗しました。(ステータス: ${glmResponse.status}) 詳細: ${errText.slice(0, 200)}`,
        },
        { status: 502 }
      );
    }

    const glmData = await glmResponse.json();

    // GLM レスポンスからテキスト取得（OpenAI互換形式）
    const rawText = glmData?.choices?.[0]?.message?.content ?? "";

    if (!rawText) {
      return NextResponse.json(
        { error: "AIからの応答が空でした。時空の歪みにより通信が遮断された可能性があります。" },
        { status: 502 }
      );
    }

    // JSON パース（コードブロック記法の除去にも対応）
    let excuseData;
    try {
      const cleaned = rawText
        .replace(/```json\s*/g, "")
        .replace(/```\s*/g, "")
        .trim();
      excuseData = JSON.parse(cleaned);
    } catch {
      console.error("JSON parse error. Raw text:", rawText);
      return NextResponse.json(
        {
          error:
            "AIが生成した文書の形式が不正でした。因果律の乱れが原因かもしれません。再申請をお試しください。",
        },
        { status: 502 }
      );
    }

    // 必須フィールドの検証
    const requiredFields = [
      "title",
      "reference_number",
      "subject",
      "content",
      "rank",
    ];
    for (const field of requiredFields) {
      if (!excuseData[field]) {
        return NextResponse.json(
          {
            error: `証明書の「${field}」フィールドが欠落しています。再申請をお試しください。`,
          },
          { status: 502 }
        );
      }
    }

    return NextResponse.json(excuseData);
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      {
        error:
          "予期せぬエラーが発生しました。時空連続体に異常が検出された可能性があります。",
      },
      { status: 500 }
    );
  }
}
