import { Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  imports: [BaseChartDirective],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;

  @Input() set chartData(chartData: ChartData<'bar'>) {
    this._chartData = chartData;
    this.chart?.update();
  }

  private _chartData: ChartData<'bar'>;

  get chartData(): ChartData<'bar'> {
    return this._chartData;
  }

  public barChartType = 'bar' as const;

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {},
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
}
