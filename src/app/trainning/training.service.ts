import {Exercise} from './excercise.model'
import {Subject, Subscription} from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { UiService } from '../shared/ui.servise';
import * as fromTraining from './training.reducer';
import * as Training from './training.action';
import * as UI from './../shared/ui.action';
import {Store} from '@ngrx/store';

@Injectable()

export class TrainingService {
 
  finishedExercisesChanged = new Subject<Exercise[]>();
  private subscribtion: Subscription[] = [];


  constructor(private db: AngularFirestore, private uiService: UiService, private store: Store){};

  fetchAvailableExercise(): void {
    this.store.dispatch(new UI.StartLoading());
      this.subscribtion.push( this.db.collection('availableExercises').snapshotChanges().pipe(
      map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            name : doc.payload.doc.data()['name'],
            calories : doc.payload.doc.data()['calories'],
            duration : doc.payload.doc.data()['duration'],
          }
        })
      })).subscribe((exercises: Exercise[]) => {
        
        this.store.dispatch(new UI.StopLoading());
        this.store.dispatch(new Training.SetAvailableTraining(exercises))
      }, error => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar('Fetching exercises is failed, Please try again', null, 3000);
      }
      ));
  }


  StartExercise(selectedId:string): void {
    this.store.dispatch(new Training.SetTraining(selectedId))
  }
  completeExercise(): void {
    this.store.select(fromTraining.getactiveExercise).pipe(take(1)).subscribe(exercise=> {
    this.addToDatabase({...exercise,date: new Date(), state: 'completed'});
    this.store.dispatch(new Training.StopTraining())
    });
  }
  cancelExercise(progress:number): void {
    this.store.select(fromTraining.getactiveExercise).pipe(take(1)).subscribe(exercise=> {
    this.addToDatabase({...exercise,
      date: new Date(),
      state: 'cancelled',
      duration: Math.ceil(exercise.duration*(progress/100)),
      calories: Math.ceil(exercise.duration*(progress/100)),
    });
    this.store.dispatch(new Training.StopTraining())
    });
    
  }
  fetchCompletdOrCancelledExercise(): void {
    this.subscribtion.push(this.db.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
      this.store.dispatch(new Training.SetFinishedTraining(exercises))
    }));
  }
  canceledSubscription() {
    this.subscribtion.forEach(subs => subs.unsubscribe());
  }
  addToDatabase(exercise: Exercise): void {
    this.db.collection('finishedExercises').add(exercise);
  }
}
