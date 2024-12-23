import { Component, Input, ViewChild } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { IpieChart, IpieChartOptions, IpieDataSet } from '../../models';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-pie',
  imports: [BaseChartDirective],
  templateUrl: './pie.component.html',
  styleUrl: './pie.component.scss'
})
export class PieComponent {
  // @Input() pieChartData: IpieDataSet;
  @Input() set pieChartData(data: IpieChart){
    this._pieChartData = data;
    this.chart?.update();
  }

  private _pieChartData: IpieChart;

  get pieChartData(): ChartData<'pie', number[], string | string[]> {
    return this._pieChartData as any as ChartData<'pie', number[], string | string[]>
  }

  @Input() pieChartOptions:IpieChartOptions;

   @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public readonlytype: ChartType = "pie"

}
