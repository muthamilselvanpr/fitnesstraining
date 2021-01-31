import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Exercise } from '../excercise.model';
import { TrainingService } from './../training.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UiService } from 'src/app/shared/ui.servise';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercises: Exercise[];
  exceriseSubscription: Subscription;
  loadingSubscription: Subscription;
  isLoading: boolean = false;

  constructor(private trainingService: TrainingService, private db: AngularFirestore, private uiService: UiService) { }

  ngOnInit(): void {
    this.exceriseSubscription = this.trainingService.exercisesChanged.subscribe(value => { this.exercises = value })
    this.loadingSubscription = this.uiService.loadingSTateChange.subscribe((value:boolean) => { this.isLoading = value })
    this.fetchExercises();
    console.log(this.exercises)
  }

  fetchExercises(): void {
    this.trainingService.fetchAvailableExercise();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.StartExercise(form.value.exercise)
  }

  ngOnDestroy() {
    if(this.exceriseSubscription) {
     this.exceriseSubscription.unsubscribe();
    }
    if(this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }  
  }

}
