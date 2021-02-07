import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { TrainingService } from './training.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromTraining from './training.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  isCurrentTraining: Observable<boolean>;

  constructor(private trainingService:TrainingService, private store: Store<fromTraining.State>) { }

  ngOnInit(): void {
    this.isCurrentTraining = this.store.select(fromTraining.getIsTraining);
  }


}
