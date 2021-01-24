import { Component, OnInit, ViewChild } from '@angular/core';
import { Exercise} from './../excercise.model';
import { MatTableDataSource } from '@angular/material/table';
import { TrainingService } from './../training.service'
import { MatSort } from '@angular/material/sort';

import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit {

  displayedColumns = ['date', 'name', 'calories', 'duration', 'state'];
  dataSource =  new MatTableDataSource<Exercise>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService:TrainingService) { }

  ngOnInit(): void {
    this.dataSource.data = this.trainingService.getCompletdOrCancelledExercise();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterEvent) {
    this.dataSource.filter = filterEvent.target.value.trim().toLowerCase();
  }

}
