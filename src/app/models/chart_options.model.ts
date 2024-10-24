export interface ChartOptions {
  colors?: string[];
  chart: {
    type: string;
    height: number;
    width: string;
  };
  stroke?: {
    colors?: string[];
    lineCap?: string;
  };
  plotOptions?: {
    pie?: {
      labels?: {
        show?: boolean;
      };
      size?: string;
      dataLabels?: {
        offset?: number;
      };
    };
  };
  labels?: string[];
  series:{
        name?: string;
        data?: number[];
      }[]
    | number[];
  dataLabels?: {
    enabled?: boolean;
    style?: {
      fontFamily?: string;
    };
  };
  legend?: {
    position?: string;
    fontFamily?: string;
  };
  yaxis?: {
    labels?: {
      formatter?: (value: any) => any;
    };
  };
  xaxis?: {
    categories?: string[];
    labels?: {
      formatter?: (value: any) => any;
    };
    axisTicks?: {
      show?: boolean;
    };
    axisBorder?: {
      show?: boolean;
    }
  };
}

export const AreaOptions: ChartOptions = {
    chart: {
      type: 'area',
      height: 350,
      width: '100%',
    },
    series: [
      {
        name: 'Reportes',
        data: [],
      },
    ],
    xaxis: {
      categories: [],
    },
  };

export const PieOptions: ChartOptions = {
  series: [],
  colors: [],
  chart: {
    height: 420,
    width: '100%',
    type: 'pie',
  },
  stroke: {
    colors: ['white'],
    lineCap: '',
  },
  plotOptions: {
    pie: {
      labels: {
        show: true,
      },
      size: '100%',
      dataLabels: {
        offset: -25,
      },
    },
  },
  labels: [],
  dataLabels: {
    enabled: true,
    style: {
      fontFamily: 'Inter, sans-serif',
    },
  },
  legend: {
    position: 'top',
    fontFamily: 'Inter, sans-serif',
  },
  yaxis: {
    labels: {
      formatter: function (value: any) {
        return value + '%';
      },
    },
  },
  xaxis: {
    labels: {
      formatter: function (value: any) {
        return value + '%';
      },
    },
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: true,
    },
  },
};
