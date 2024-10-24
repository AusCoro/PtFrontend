export interface ReportCount {
  day: number;
  month: string | number;
  year: number;
  total_count: number;
}

export interface RepostsCountResponse {
  reports: ReportCount[];
}

export interface filterOptionsModel {
  label: string;
  value: string;
}
