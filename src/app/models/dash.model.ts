export interface ReportsData {
  delivery_date: string;
  creation_date: string;
  bdo_number: number;
  airline: string;
  delivery_status: string;
  destination: string;
}

export interface ReportCount {
  day: number;
  month: string | number;
  year: number;
  total_count: number;
}

export interface RepostsCountResponse {
  reports: ReportCount[];
  reports_data?: ReportsData[];
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
  airline?: string;
  delivery_status?: string;
}

export interface StatutesPercent {
  status: string;
  percentage: number;
}

export interface StatutesPercentResponse {
  statuses: StatutesPercent[];
}

export interface CompletionTimes {
  average_time: number;
  delivery_zone: string;
  destination: string;
}

export interface CompletionTimesResponse {
  completion_times: CompletionTimes[];
}
