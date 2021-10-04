import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { PersonasService } from '../../../services/personas.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

export interface PersonsElement {
  numberrange: number,
  name: string;
  email: string;
  address: string;
  country: string;
}

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})

export class PersonasComponent implements OnInit {

  constructor( private personSrv: PersonasService) { }

  ngOnInit(): void {
    this.getPersonas();
  }
  displayedColumns: string[] = ['numberrange', 'name', 'email', 'address',"country"];
  dataSource = new MatTableDataSource();
  status: number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getPersonas():void{

    this.personSrv.getPersonas()
    .subscribe(data => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = data.payload;
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort;
      this.status = data.status;

    }, error => {
      console.log(error);
    });


  }


}
