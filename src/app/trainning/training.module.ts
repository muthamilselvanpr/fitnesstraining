import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { TrainingRoutingModule } from './trainning-routing.module';

import { CurrenttrainingComponent } from './currenttraining/currenttraining.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { TrainingComponent } from './training.component';
import { trainingReducer } from './training.reducer'


@NgModule({
    declarations: [
        TrainingComponent,
        CurrenttrainingComponent,
        NewTrainingComponent,
        PastTrainingComponent
    ],
    imports: [
        SharedModule,
        TrainingRoutingModule,
        StoreModule.forFeature('training',trainingReducer)
    ],
    exports: []
})

export class TrainingModule {

}