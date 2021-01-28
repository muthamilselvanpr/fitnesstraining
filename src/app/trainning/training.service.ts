import {Exercise} from './excercise.model'
import {Subject} from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()

export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private availableExercise: Exercise[] = []

  private runningExercise: Exercise;
  private exercises: Exercise[] = [];

  constructor(private db: AngularFirestore){};

  fetchAvailableExercise(): void {
       this.db.collection('availableExercises').snapshotChanges().pipe(
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
        this.availableExercise = exercises;
        this.exercisesChanged.next([...this.availableExercise])
      });
  }

  getRunningExercise(): Exercise {
    return {...this.runningExercise};
  }

  StartExercise(selectedId:string): void {
    this.runningExercise =  this.availableExercise.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({...this.runningExercise});
  }
  completeExercise(): void {
    this.addToDatabase({...this.runningExercise,date: new Date(), state: 'completed'});
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }
  cancelExercise(progress:number): void {
    this.addToDatabase({...this.runningExercise,
      date: new Date(),
      state: 'cancelled',
      duration: Math.ceil(this.runningExercise.duration*(progress/100)),
      calories: Math.ceil(this.runningExercise.duration*(progress/100)),
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }
  fetchCompletdOrCancelledExercise(): void {
    this.db.collection('finishedExercises').valueChanges().subscribe((exercise: Exercise[]) => {
      this.finishedExercisesChanged.next(exercise);
    })
  }
  addToDatabase(exercise: Exercise): void {
    this.db.collection('finishedExercises').add(exercise);
  }
}
