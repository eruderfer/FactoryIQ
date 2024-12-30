import { Component, Input, ViewChild } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { IPieChart, IpieChartOptions, IpieDataSet } from '../../models';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pie',
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './pie.component.html',
  styleUrl: './pie.component.scss'
})
export class PieComponent {
  // @Input() pieChartData: IpieDataSet;
  @Input() set pieChartData(data: IPieChart){
    this._pieChartData = data;
    this.chart?.update();
  }

  private _pieChartData: IPieChart;

  get pieChartData(): ChartData<'pie', number[], string | string[]> {
    return this._pieChartData as any as ChartData<'pie', number[], string | string[]>
  }

  @Input() pieChartOptions:IpieChartOptions;

   @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public readonly type: ChartType = "pie"

}
