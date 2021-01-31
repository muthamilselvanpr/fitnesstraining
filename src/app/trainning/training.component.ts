import { Component, OnDestroy, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { TrainingService } from './training.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {

  isCurrentTraining = false;
  exerSubscribe: Subscription;

  constructor(private trainingService:TrainingService) { }

  ngOnInit(): void {
    this.exerSubscribe = this.trainingService.exerciseChanged.subscribe(exercise => {
      if(exercise) {
        this.isCurrentTraining = true;
      } else {
        this.isCurrentTraining = false;
      }
    })
  }

  ngOnDestroy(): void {
    if(this.exerSubscribe) {
      this.exerSubscribe.unsubscribe();
    }
  }

}
