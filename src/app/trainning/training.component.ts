import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { TrainingService } from './training.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  isCurrentTraining = false;

  constructor(private trainingService:TrainingService) { }

  ngOnInit(): void {
    this.trainingService.exerciseChanged.subscribe(exercise => {
      if(exercise) {
        this.isCurrentTraining = true;
      } else {
        this.isCurrentTraining = false;
      }
    })
  }

}
