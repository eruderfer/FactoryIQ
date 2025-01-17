import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Department } from '../../../models';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

@Component({
  selector: 'app-machines-table',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIcon,
    CommonModule,
  ],
  templateUrl: './machines-table.component.html',
  styleUrl: './machines-table.component.scss',
})
export class MachinesTableComponent {
  displayedColumns: string[] = [
    'department',
    'machineId',
    'machineName',
    'efficiency',
    'pressure',
    'temperature',
    'status',
  ];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() set departmentsData(departmentsData: Department[]) {
    this.mapDepartmentsDataToTable(departmentsData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private mapDepartmentsDataToTable(departmentsData: Department[]): void {
    /**
     * department
     * machine id
     * machine name
     * efficiency
     * pressure
     * temperature
     * status
     */

    const flatData = [];

    departmentsData.forEach((department) => {
      department.machines.forEach((machine) => {
        const mappedMachine = {
          department: department.name,
          machineId: machine.id,
          machineName: machine.name,
          efficiency: machine.metrics.efficiency,
          pressure: machine.metrics.pressure,
          temperature: machine.metrics.temperature,
          status: machine.status,
        };

        flatData.push(mappedMachine);
      });
    });

    console.log('flat data: ', flatData);
    this.dataSource = new MatTableDataSource(flatData);
  }

  constructor() {
    // Create 100 users
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);

    console.log(users);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
  };
}