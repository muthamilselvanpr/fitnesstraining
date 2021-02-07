import { Exercise } from './excercise.model';
import { SET_FINISHEDTRAINING,SET_AVAILABLETRAINING,START_TRAINING,STOP_TRAINING, trainingActions } from './training.action';
import * as fromRoot from './../app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';


export interface TrainingState {
    availableExercise: Exercise[];
    finishedExercise: Exercise[];
    activeExercise: Exercise;
}

export interface State extends fromRoot.State {
    training: TrainingState
}

const initialState: TrainingState = {
    availableExercise: [],
    finishedExercise: [],
    activeExercise: null
}

export function trainingReducer(state = initialState,action: trainingActions) {
    switch(action.type){
        case SET_AVAILABLETRAINING: 
            return {
                ...state,
                availableExercise: action.payload
            };
        case  SET_FINISHEDTRAINING: 
            return {
                ...state,
                finishedExercise: action.payload
            };
        case  START_TRAINING: 
            return {
                ...state,
                activeExercise: { ...state.availableExercise.find(exercise => exercise.id === action.payload)}
            };
        case  STOP_TRAINING:
            return {
                ...state,
                activeExercise: null
            };
        default: {
            return state;
        }
    }
}



export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getavailableExercise = createSelector(getTrainingState, (state: TrainingState) => state.availableExercise);
export const getfinishedExercise =  createSelector(getTrainingState, (state: TrainingState) => state.finishedExercise);
export const getactiveExercise =  createSelector(getTrainingState, (state: TrainingState) => state.activeExercise);
export const getIsTraining =  createSelector(getTrainingState, (state: TrainingState) => state.activeExercise !== null);