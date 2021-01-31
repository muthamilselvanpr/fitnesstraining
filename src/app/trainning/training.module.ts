import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { CurrenttrainingComponent } from './currenttraining/currenttraining.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { TrainingComponent } from './training.component';
import { TrainingRoutingModule } from './trainning-routing.module';


@NgModule({
    declarations: [
        TrainingComponent,
        CurrenttrainingComponent,
        NewTrainingComponent,
        PastTrainingComponent
    ],
    imports: [
        SharedModule,
        TrainingRoutingModule
    ],
    exports: []
})

export class TrainingModule {

}