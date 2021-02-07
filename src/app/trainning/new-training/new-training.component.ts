import { Component, OnInit } from '@angular/core';
import { Exercise } from '../excercise.model';
import { TrainingService } from './../training.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { UiService } from 'src/app/shared/ui.servise';
import { Store } from '@ngrx/store';
import * as fromTraining from './../training.reducer'
import * as fromRoot from './../../app.reducer'

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {

  exercises: Observable<Exercise[]>;
  isLoading: Observable<boolean>;

  constructor(private trainingService: TrainingService, private db: AngularFirestore, private uiService: UiService, private store: Store<fromTraining.State>) { }

  ngOnInit(): void {
    this.exercises = this.store.select(fromTraining.getavailableExercise);
    this.isLoading = this.store.select(fromRoot.getIsLoading);
    this.fetchExercises();
  }

  fetchExercises(): void {
    this.trainingService.fetchAvailableExercise();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.StartExercise(form.value.exercise)
  }

}
