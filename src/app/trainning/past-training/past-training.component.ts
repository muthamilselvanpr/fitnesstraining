import { Component, OnInit, ViewChild } from '@angular/core';
import { Exercise} from './../excercise.model';
import { MatTableDataSource } from '@angular/material/table';
import { TrainingService } from './../training.service'
import { MatSort } from '@angular/material/sort';
import * as fromTraining from './../training.reducer';
import { Store } from '@ngrx/store';

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

  constructor(private trainingService:TrainingService, private store: Store<fromTraining.State>) { }

  ngOnInit(): void {
   
   this.store.select(fromTraining.getfinishedExercise).subscribe((exercise: Exercise[]) => {
    this.dataSource.data = exercise;
   });
   this.trainingService.fetchCompletdOrCancelledExercise();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterEvent): void {
    this.dataSource.filter = filterEvent.target.value.trim().toLowerCase();
  }

  

}
