export interface ChartOptions {
  colors?: string[];
  chart: {
    type: string;
    height?: string | number;
    width?: string;
    fontFamily?: string;
    toolbar?: {
      show?: boolean;
    };
  };
  stroke?: {
    colors?: string[];
    lineCap?: string;
    show?: boolean;
    width?: number;
  };
  grid?: {
    show?: boolean;
    strokeDashArray?: number;
    padding?: { left?: number; right?: number; top?: number };
  };
  plotOptions?: {
    bar?: {
      horizontal?: boolean;
      columnWidth?: string;
      borderRadiusApplication?: string;
      borderRadius?: number;
    };
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
  tooltip?: {
    shared?: boolean;
    intersect?: boolean;
    style?: { fontFamily?: string };
  };
  states?: { hover?: { filter?: { type?: string; value?: number } } };
  labels?: string[];
  series:
    | {}
    | {
        name?: string;
        data?: number[] | { x: string; y: number | string }[];
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
    show?: boolean;
  };
  yaxis?: {
    labels?: {
      formatter?: (value: any) => any;
    };
    show?: boolean;
  };
  xaxis?: {
    categories?: string[];
    labels?: {
      formatter?: (value: any) => any;
      style?: {
        fontFamily?: string;
        cssClass?: string;
      };
      show?: boolean;
    };
    axisTicks?: {
      show?: boolean;
    };
    axisBorder?: {
      show?: boolean;
    };
    floating?: boolean;
  };
  fill?: { opacity?: number };
}

export const AreaOptions: ChartOptions = {
  colors: ['#16BDCA'],
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
    toolbar: {
      show: true,
    }
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

export const ColumnOptions: ChartOptions = {
  colors: ['#16BDCA'],
  series: [
    {
      name: 'Organic',
      color: '#16BDCA',
      data: [
      ],
    },
  ],
  chart: {
    type: 'bar',
    height: '320px',
    fontFamily: 'Inter, sans-serif',
    toolbar: {
      show: true,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '70%',
      borderRadiusApplication: 'end',
      borderRadius: 8,
    },
  },
  tooltip: {
    shared: true,
    intersect: false,
    style: {
      fontFamily: 'Inter, sans-serif',
    },
  },
  states: {
    hover: {
      filter: {
        type: 'darken',
        value: 1,
      },
    },
  },
  stroke: {
    show: true,
    width: 0,
    colors: ['transparent'],
  },
  grid: {
    show: false,
    strokeDashArray: 4,
    padding: {
      left: 2,
      right: 2,
      top: -14,
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  xaxis: {
    floating: false,
    labels: {
      show: true,
      style: {
        fontFamily: 'Inter, sans-serif',
        cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
  fill: {
    opacity: 1,
  },
};
