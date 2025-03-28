// 📚 components/historyguidetrip/Types.ts
export interface PackageData {
  id: number;
  title: string;
  subtitle?: string;
  image: string;
  status: "กำลังดำเนินการ" | "เตรียม" | "เสร็จสิ้น" | string;
  date?: string;
  description?: string;
  showDetails: boolean;
}

export type ButtonType = "primary" | "danger" | "default";
