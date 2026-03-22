/** 言い訳データの型定義 */
export interface ExcuseData {
  title: string;
  reference_number: string;
  subject: string;
  content: string;
  rank: string;
}

/** フォーム入力の型定義 */
export interface FormInput {
  applicantName: string;
  incident: string;
  mundaneReason: string;
}
