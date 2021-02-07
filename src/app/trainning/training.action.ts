import { Action } from '@ngrx/store';
import { Exercise } from './excercise.model';

export const SET_AVAILABLETRAINING = '[TRAINING] set availabletraining';
export const SET_FINISHEDTRAINING = '[TRAINING] set finishedtraining';
export const START_TRAINING = '[TRAINING] set start training';
export const STOP_TRAINING = '[TRAINING] set staop training';

export class SetAvailableTraining implements Action {
    readonly type = SET_AVAILABLETRAINING;
    constructor(public payload: Exercise[]) {
    }
}

export class SetFinishedTraining implements Action {
    readonly type = SET_FINISHEDTRAINING;
    constructor(public payload: Exercise[]) {}
}

export class SetTraining implements Action {
    readonly type = START_TRAINING;
    constructor(public payload: string) {}
}

export class StopTraining implements Action {
    readonly type = STOP_TRAINING;
}

export type trainingActions = SetAvailableTraining | SetFinishedTraining | SetTraining | StopTraining;