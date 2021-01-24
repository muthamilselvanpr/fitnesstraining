import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Exercise } from '../excercise.model';
import {TrainingService} from './../training.service';
import {NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {

  exercises: Exercise[];

  constructor(private trainingService:TrainingService) { }

  ngOnInit(): void {
    this.exercises = this.trainingService.getAvailableExercise();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.StartExercise(form.value.exercise)
  }

}
