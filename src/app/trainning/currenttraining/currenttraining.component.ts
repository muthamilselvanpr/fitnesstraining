import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StopTrainingComponent } from './stop-training.component'
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {TrainingService} from './../training.service'

@Component({
  selector: 'app-currenttraining',
  templateUrl: './currenttraining.component.html',
  styleUrls: ['./currenttraining.component.scss']
})
export class CurrenttrainingComponent implements OnInit {

  @Output() dialogClose = new EventEmitter<void>()

  progress = 0;
  timer: number;

  constructor(private dialog: MatDialog, private trainingService:TrainingService) { }

  ngOnInit(): void {
    this.progress = 0;
    this.startOrResume();
  }

  startOrResume() {
    const step = this.trainingService.getRunningExercise().duration / 100 * 1000 ;
    this.timer = setInterval(()=>{
      this.progress=this.progress+1;
      if(this.progress>=100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, step);
  }

  stopTraining():void {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, { data: {
      progress: this.progress
    }});
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.trainingService.cancelExercise(this.progress)
      } else {
        this.startOrResume();
      }

    });
  }

}
