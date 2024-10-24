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

export interface filterParams {
  filter: filterOptionsModel;
  month?: number;
  year?: number;
  operator_id?: string;
}

export interface StatutesPercent {
  status: string;
  percentage: number;
}

export interface StatutesPercentResponse {
  statuses: StatutesPercent[];
}
