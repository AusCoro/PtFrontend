export interface ReportsInterface {
  id?: string;
  creation_date?: string;
  delivery_date?: string;
  airline: string;
  reference_number: number;
  bdo_number: number;
  delivery_zone: string;
  operator?: Operator;
  delivery_status?: string;
}

interface Operator {
  operator_id: string;
  operator_name: string;
}
