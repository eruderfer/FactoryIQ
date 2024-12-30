export interface IPieChart {
    labels: string[];
    datasets:IpieDataSet[]
}

export interface IpieDataSet{
    data: number[];
}

export interface IpieChartOptions{
    plugins:{
        legend: {
            display: boolean,
            position: 'top' | 'left' | 'bottom' | 'right';
        }
    }
}