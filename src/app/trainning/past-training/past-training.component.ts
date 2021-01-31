import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Exercise} from './../excercise.model';
import { MatTableDataSource } from '@angular/material/table';
import { TrainingService } from './../training.service'
import { MatSort } from '@angular/material/sort';

import {merge, Observable, of as observableOf, Subscription} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit, OnDestroy {

  displayedColumns = ['date', 'name', 'calories', 'duration', 'state'];
  dataSource =  new MatTableDataSource<Exercise>();
  finishedExerciseSubscription: Subscription;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService:TrainingService) { }

  ngOnInit(): void {
   this.trainingService.fetchCompletdOrCancelledExercise();
   this.finishedExerciseSubscription = this.trainingService.finishedExercisesChanged.subscribe((exercise: Exercise[]) => {
    this.dataSource.data = exercise;
   })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterEvent): void {
    this.dataSource.filter = filterEvent.target.value.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    if(this.finishedExerciseSubscription) {
    this.finishedExerciseSubscription.unsubscribe();
    }
  }

}
