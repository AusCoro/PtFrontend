export interface ReportsInterface {
    id: string;
    numRef: number;
    numBDO: number;
    create_date: string;
    finish_date?: string;
    destination: string;
    station: string;
    airline: string;
    deliveryZone: string;
    status: string;
}
