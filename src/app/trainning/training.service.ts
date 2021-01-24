import {Exercise} from './excercise.model'
import {Subject} from 'rxjs'

export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  private availableExercise: Exercise[] = [
    {id:'crunches',name:'Crunches',duration:30,calories:8},
    {id:'touchtoes',name:'Touch-toes',duration:100,calories:10},
    {id:'side-lungues',name:'Side-lungues',duration:120,calories:12},
    {id:'burpees',name:'Burpees',duration:60,calories:8},
  ]

  private runningExercise: Exercise;
  private exercises: Exercise[] = [];

  getAvailableExercise(): Exercise[] {
    return this.availableExercise.slice();
  }

  getRunningExercise(): Exercise {
    return {...this.runningExercise};
  }

  StartExercise(selectedId:string): void {
    this.runningExercise =  this.availableExercise.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({...this.runningExercise});
  }
  completeExercise(): void {
    this.exercises.push({...this.runningExercise,date: new Date(), state: 'completed'});
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }
  cancelExercise(progress:number): void {
    this.exercises.push({...this.runningExercise,
      date: new Date(),
      state: 'cancelled',
      duration: Math.ceil(this.runningExercise.duration*(progress/100)),
      calories: Math.ceil(this.runningExercise.duration*(progress/100)),
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }
  getCompletdOrCancelledExercise(): Exercise[] {
    return this.exercises.slice();
  }
}
