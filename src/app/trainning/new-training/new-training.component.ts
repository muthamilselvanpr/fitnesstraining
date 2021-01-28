import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Exercise } from '../excercise.model';
import { TrainingService } from './../training.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercises: Exercise[];
  exceriseSubscription: Subscription;

  constructor(private trainingService: TrainingService, private db: AngularFirestore) { }

  ngOnInit(): void {
    this.exceriseSubscription = this.trainingService.exercisesChanged.subscribe(value => { this.exercises = value })
    this.trainingService.fetchAvailableExercise();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.StartExercise(form.value.exercise)
  }

  ngOnDestroy() {
    this.exceriseSubscription.unsubscribe();
  }

}
